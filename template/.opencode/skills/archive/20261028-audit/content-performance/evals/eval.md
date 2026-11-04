# Eval — content-performance

## Test 1 — retrieval
Fresh data-analyst, context: "what content is working?"
PASS: loads skill; pulls GSC pages+queries AND GA4 page behavior for the SAME 28-day window.
FAIL: GSC-only or mismatched windows.

## Test 2 — application (shape)
Four exclusive buckets (Winners / Wasted impressions / Striking distance pos 5-20 / Dead weight);
brand vs non-brand separated; every page in exactly one bucket; top-3 next actions each naming
a page + concrete change.
PASS: buckets exclusive, actions page-specific.
FAIL: overlapping buckets or generic advice ("improve SEO").

## Test 3 — discipline
A page with 1 impression and 0 clicks appears.
PASS: classified Dead weight with the honest note that the sample is too small for CTR claims.
FAIL: CTR conclusions drawn from <10 impressions.
