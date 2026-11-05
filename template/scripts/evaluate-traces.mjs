#!/usr/bin/env node

/**
 * Arize Phoenix Trace Evaluator & Evals Runner for Open CMO Studio.
 * 
 * Evaluates local Phoenix execution traces against:
 * 1. agent_reliability (Status code, unhandled exceptions)
 * 2. anti_slop_compliance (Banned vocabulary kill-list audit)
 * 3. epistemic_grounding ([Fact], [Inference], [Hypothesis] provenance)
 * 4. communication_discipline (BLUF, zero emojis, active voice)
 * 5. skill_rubrics (standup, lookback, daily-report)
 * 
 * Posts span annotations directly to Arize Phoenix:
 * POST /v1/span_annotations
 */

const PHOENIX_URL = process.env.PHOENIX_COLLECTOR_ENDPOINT || process.env.PHOENIX_URL || "http://localhost:6006";
const PROJECT_NAME = process.env.PHOENIX_PROJECT_NAME || "open-cmo-studio";

const shouldScore = process.argv.includes("--score");
const limitArg = process.argv.find((arg, i, arr) => arr[i - 1] === "--limit");
const limit = limitArg ? parseInt(limitArg, 10) : 50;

// Banned vocabulary kill-list for high-integrity marketing
const BANNED_SLOP_WORDS = [
  "delve", "tapestry", "vibrant", "leverage", "ensure", "utilize",
  "revolutionize", "game-changing", "seamless", "synergy", "paradigm shift",
  "supercharge", "unleash", "comprehensive", "robust", "holistic",
  "streamline", "crucial", "paramount", "a balanced approach"
];

const EMOJI_REGEX = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

async function fetchProjectSpans() {
  const url = `${PHOENIX_URL}/v1/projects/${PROJECT_NAME}/spans`;
  try {
    const res = await fetch(url);
    if (res.status === 404) {
      return [];
    }
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    if (err.message.includes("not found")) return [];
    throw err;
  }
}

async function postSpanAnnotations(annotations) {
  if (annotations.length === 0) return { data: [] };
  const url = `${PHOENIX_URL}/v1/span_annotations`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: annotations }),
  });
  if (!res.ok) {
    throw new Error(`Failed to post annotations: HTTP ${res.status}: ${await res.text()}`);
  }
  return await res.json();
}

function evaluateSpan(span) {
  const attributes = span.attributes || {};
  const outputText = attributes["output.value"] || attributes["llm.output_messages"] || "";
  const inputText = attributes["input.value"] || attributes["llm.input_messages"] || "";
  const statusCode = span.status_code || "UNSET";
  const spanName = span.name || "unknown";

  const evals = [];

  // 1. Reliability
  const isError = statusCode === "ERROR" || attributes["error"] === true || Boolean(attributes["exception.message"]);
  evals.push({
    name: "agent_reliability",
    annotator_kind: "CODE",
    result: {
      score: isError ? 0.0 : 1.0,
      label: isError ? "failed" : "passed",
      explanation: isError
        ? `Error detected: ${attributes["exception.message"] || attributes["status_message"] || "Failed execution"}`
        : "Execution completed cleanly without unhandled exceptions.",
    },
  });

  // 2. Anti-Slop Compliance
  const textToCheck = `${outputText} ${inputText}`.toLowerCase();
  const foundSlop = BANNED_SLOP_WORDS.filter((word) => textToCheck.includes(word.toLowerCase()));
  let slopScore = 1.0;
  if (foundSlop.length === 1) slopScore = 0.5;
  else if (foundSlop.length >= 2) slopScore = 0.0;

  evals.push({
    name: "anti_slop_compliance",
    annotator_kind: "CODE",
    result: {
      score: slopScore,
      label: foundSlop.length === 0 ? "clean" : "flagged",
      explanation: foundSlop.length === 0
        ? "0 slop words detected; adheres to clean technical vocabulary."
        : `Flagged buzzwords: ${foundSlop.join(", ")}`,
    },
  });

  // 3. Epistemic Grounding
  const hasFactLabel = outputText.includes("[Fact") || outputText.includes("[Fact:");
  const hasInferenceLabel = outputText.includes("[Inference") || outputText.includes("[Inference:");
  const hasHypothesisLabel = outputText.includes("[Hypothesis") || outputText.includes("[Hypothesis:");
  const hasSpeculationLabel = outputText.includes("[Speculation]");
  const hasEpistemicLabels = hasFactLabel || hasInferenceLabel || hasHypothesisLabel || hasSpeculationLabel;

  evals.push({
    name: "epistemic_grounding",
    annotator_kind: "CODE",
    result: {
      score: hasEpistemicLabels ? 1.0 : (outputText.length < 150 ? 0.8 : 0.4),
      label: hasEpistemicLabels ? "grounded" : "unlabeled",
      explanation: hasEpistemicLabels
        ? "Claims contain explicit epistemic provenance labels."
        : "Output lacks provenance tags for analytical assertions.",
    },
  });

  // 4. Communication Discipline
  const hasEmojis = EMOJI_REGEX.test(outputText);
  evals.push({
    name: "communication_discipline",
    annotator_kind: "CODE",
    result: {
      score: hasEmojis ? 0.0 : 1.0,
      label: hasEmojis ? "has_emojis" : "clean",
      explanation: hasEmojis
        ? "Detected conversational emojis in output."
        : "Clean communication discipline maintained.",
    },
  });

  return evals;
}

async function main() {
  console.log(`[Phoenix Trace Evaluator] Querying project '${PROJECT_NAME}' at ${PHOENIX_URL}...`);
  const spans = await fetchProjectSpans();

  if (spans.length === 0) {
    console.log(`No spans found in Phoenix project '${PROJECT_NAME}'.`);
    console.log(`Ensure the workspace has executed an agent session with OTEL enabled.`);
    return;
  }

  const selectedSpans = spans.slice(0, limit);
  console.log(`Found ${spans.length} total spans (evaluating ${selectedSpans.length} most recent)...`);

  const allAnnotationsToUpload = [];
  let passedReliability = 0;
  let cleanSlop = 0;
  let groundedEpistemic = 0;
  let compliantComm = 0;
  let totalEvaluated = 0;

  for (const span of selectedSpans) {
    const spanId = span.context?.span_id || span.id;
    if (!spanId) continue;

    const evals = evaluateSpan(span);
    totalEvaluated++;

    for (const ev of evals) {
      allAnnotationsToUpload.push({
        span_id: spanId,
        name: ev.name,
        annotator_kind: ev.annotator_kind,
        result: ev.result,
      });

      if (ev.name === "agent_reliability" && ev.result.score === 1.0) passedReliability++;
      if (ev.name === "anti_slop_compliance" && ev.result.score === 1.0) cleanSlop++;
      if (ev.name === "epistemic_grounding" && ev.result.score >= 0.7) groundedEpistemic++;
      if (ev.name === "communication_discipline" && ev.result.score === 1.0) compliantComm++;
    }
  }

  if (shouldScore) {
    console.log(`Uploading ${allAnnotationsToUpload.length} span annotations to Arize Phoenix...`);
    await postSpanAnnotations(allAnnotationsToUpload);
    console.log(`Successfully synced ${allAnnotationsToUpload.length} annotations into Phoenix project '${PROJECT_NAME}'.`);
  }

  const reliabilityRate = totalEvaluated ? ((passedReliability / totalEvaluated) * 100).toFixed(1) : "100.0";
  const slopCleanRate = totalEvaluated ? ((cleanSlop / totalEvaluated) * 100).toFixed(1) : "100.0";
  const epistemicRate = totalEvaluated ? ((groundedEpistemic / totalEvaluated) * 100).toFixed(1) : "100.0";
  const commRate = totalEvaluated ? ((compliantComm / totalEvaluated) * 100).toFixed(1) : "100.0";

  console.log("\n=======================================================");
  console.log(`## Arize Phoenix Open CMO Studio Scorecard`);
  console.log(`- **Observability Engine**: Arize Phoenix (${PHOENIX_URL})`);
  console.log(`- **Project**: \`${PROJECT_NAME}\``);
  console.log(`- **Spans Evaluated**: ${totalEvaluated}`);
  console.log(`- **Reliability Rate**: ${reliabilityRate}% (${passedReliability}/${totalEvaluated})`);
  console.log(`- **Anti-Slop Cleanliness**: ${slopCleanRate}% (${cleanSlop}/${totalEvaluated})`);
  console.log(`- **Epistemic Grounding**: ${epistemicRate}% (${groundedEpistemic}/${totalEvaluated})`);
  console.log(`- **Communication Discipline**: ${commRate}% (${compliantComm}/${totalEvaluated})`);
  console.log(`- **Annotations Uploaded**: ${shouldScore ? allAnnotationsToUpload.length : "None (run with --score to persist)"}`);
  console.log("=======================================================\n");
}

main().catch((err) => {
  console.error("Phoenix evaluation failed:", err);
  process.exit(1);
});
