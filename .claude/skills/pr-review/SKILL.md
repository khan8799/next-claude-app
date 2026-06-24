---
name: pr-review
description: >
  Review implementation quality and PR readiness before submission.
---

# PR Review

Use when:
- reviewing a branch
- preparing PR
- validating implementation

## Analyze

Inspect:

git diff origin/dev...HEAD

Review:
- architecture
- maintainability
- readability
- performance
- naming

Do not review unchanged code.

---

## Review Categories

### Architecture
Check:
- separation of concerns
- folder structure
- duplication

### Naming
Verify:
- meaningful names
- camelCase
- PascalCase

### Maintainability
Review:
- nesting
- complexity
- reusability

### Performance
Review:
- loops
- unnecessary renders
- API usage

---

## Report

# PR Review Report

## Summary
PASS / FAIL

## Blockers
(list)

## Suggestions
(list)

## Nice Improvements
(optional)

## Final Verdict
READY
or
NEEDS WORK