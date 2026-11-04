# Product Catalog & Positioning

## Core Product: CloudPulse Agent
* **Slug**: `cloudpulse-agent`
* **Category**: Cloud Cost Optimization & Observability
* **Status**: Active / Public

### Problem Space
* Engineering teams face unexpected 30-50% cloud cost spikes on AWS/GCP Kubernetes clusters.
* Cloud provider cost dashboards are delayed by 24 to 48 hours, making real-time remediation impossible.
* Manual resource tagging and rightsizing is ignored by busy developers.

### Solution Primitives
* **Sub-Second Anomaly Detection**: Local eBPF agent monitors pod resource consumption and flags cost anomalies in real time.
* **Autonomous Rightsizing Recommendations**: Automated pull requests that adjust CPU/memory limits without service disruption.
* **OpenTelemetry Native**: Streams cost spans directly to Prometheus, Grafana, and Arize Phoenix.

### Key Differentiators
* Open-core and local-first: Sensitive workload telemetry never leaves the customer's VPC.
* Agentic remediation: Does not just report graphs; proposes executable PRs and runbooks.
