# Nuevo Foundation feature delivery

This is the reusable workflow behind a feature, not the feature request itself.
The PM brief supplies the outcome and acceptance criteria; `SKILL.md` supplies
the issue, implementation, verification, and completion procedure.

## Use it in Copilot CLI

Start Copilot from this repository. Inspect the discovered skill:

```text
/skills reload
/skills info issue-lifecycle
```

Confirm that the path is this repository's
`.github/skills/issue-lifecycle/SKILL.md`. If the installed client cannot reload,
restart it. Natural-language selection can vary; explicit invocation is the
reliable teaching and troubleshooting entry point.

Start small, with no writes:

```text
/issue-lifecycle Preview the delivery plan for a feature brief. Do not create an issue, edit files, or publish anything.
```

Then use separate, deliberate phases:

```text
/issue-lifecycle Start tracking the feature described in this brief. Confirm the repository and acceptance criteria, open or reuse the issue, mark it in progress, then stop.
```

After approving implementation, inspect the changes and checks. Authorize the
intended commit, working-branch push, and PR separately or explicitly as part of
the work request. Never infer permission to merge or deploy from the word "preview".

```text
/issue-lifecycle Finish issue NUMBER. Verify its published change and agreed completion gate, then close with the actual evidence and follow-ups.
```

Replace `NUMBER` with the real issue number.

## What counts as completion?

| Context | Gate | What not to claim |
| --- | --- | --- |
| Normal repository contribution | PR merged after applicable checks and review | That a local commit or open PR has shipped |
| Explicit workshop branch handoff | Intended commit published on the attendee's branch | That the production site was deployed |
| A change requiring deployment | Agreed code gate plus observed changed live behavior | That HTTP success alone proves the feature works |
| Remote service unavailable | Local work may continue only with approval; online steps stay pending | That a GitHub issue, push, close, or deployment succeeded |

The existing progress label is `in progress`. A new workshop repository may need
to create it. Labels and GitHub Projects fields are different mechanisms.

## Boundaries

- GitHub CLI (`gh`) and Git need the appropriate authentication and permissions.
- Local skill files remove a need to fetch the procedure from the web; they do
  not make hosted model services or GitHub operations work without connectivity.
- A skill is guidance that the agent reads. It is not a security boundary or a
  guarantee of model compliance. Keep normal approvals and repository controls.
- Do not invent impact statistics, team biographies, acceptance results, or URLs.
- A failed start, push, check, merge, or close must remain visible in the record.
- Do not perform test changes on the public website or a real backlog without
  explicit authorization. Use a disposable repository for practice.
