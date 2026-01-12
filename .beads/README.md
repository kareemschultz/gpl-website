# Beads Tracking System

This directory contains the Beads issue tracking and sprint management system for the GPL Website project.

## Structure

```
.beads/
├── issues/           # Individual issue tracking files
├── sprints/          # Sprint planning and tracking
├── sessions/         # Work session logs
└── README.md         # This file
```

## Issue Tracking

Issues are stored as individual Markdown files in the `issues/` directory.

### Issue File Format

```markdown
# Issue: [Title]

**ID**: ISSUE-XXX
**Type**: [feature|bug|enhancement|documentation|infrastructure]
**Priority**: [critical|high|medium|low]
**Status**: [backlog|planned|in-progress|review|completed|blocked]
**Created**: YYYY-MM-DD
**Updated**: YYYY-MM-DD
**Assignee**: [Name]
**Sprint**: [Sprint ID or null]

## Description

[Detailed description of the issue]

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2

## Tasks

- [ ] Task 1
- [ ] Task 2

## Notes

[Additional notes, links, references]

## History

- YYYY-MM-DD: [Status change or update]
```

## Sprint Tracking

Sprints are stored in the `sprints/` directory.

### Sprint File Format

```markdown
# Sprint: [Name]

**ID**: SPRINT-XXX
**Start Date**: YYYY-MM-DD
**End Date**: YYYY-MM-DD
**Status**: [planning|active|completed]
**Goal**: [Sprint goal]

## Issues

### Critical
- ISSUE-001: [Title] (status)

### High Priority
- ISSUE-002: [Title] (status)

### Medium Priority
- ISSUE-003: [Title] (status)

## Metrics

- **Planned**: X issues
- **Completed**: Y issues
- **Carried Over**: Z issues

## Retrospective

### What Went Well
- Item 1

### What Could Be Improved
- Item 1

### Action Items
- [ ] Action 1
```

## Work Session Logs

Work sessions are logged in the `sessions/` directory for tracking daily progress.

### Session Log Format

```markdown
# Work Session: YYYY-MM-DD

**Date**: YYYY-MM-DD
**Duration**: X hours
**Sprint**: SPRINT-XXX

## Issues Worked On

- ISSUE-001: [Brief description of work done]
- ISSUE-002: [Brief description of work done]

## Accomplishments

- Accomplishment 1
- Accomplishment 2

## Blockers

- Blocker 1 (if any)

## Next Session

- Plan 1
- Plan 2
```

## Usage

### Creating a New Issue

```bash
# Create issue file
touch .beads/issues/ISSUE-001-emergency-contacts.md

# Edit with your editor
vim .beads/issues/ISSUE-001-emergency-contacts.md
```

### Creating a New Sprint

```bash
# Create sprint file
touch .beads/sprints/SPRINT-001-mvp-foundation.md

# Edit with your editor
vim .beads/sprints/SPRINT-001-mvp-foundation.md
```

### Logging a Work Session

```bash
# Create session log
touch .beads/sessions/2026-01-11.md

# Edit with your editor
vim .beads/sessions/2026-01-11.md
```

## Issue ID Convention

- **Format**: `ISSUE-XXX-brief-description`
- **Example**: `ISSUE-001-emergency-contacts.md`

## Sprint ID Convention

- **Format**: `SPRINT-XXX-brief-name`
- **Example**: `SPRINT-001-mvp-foundation.md`

## Status Workflow

```
backlog → planned → in-progress → review → completed
                                      ↓
                                  blocked
```

## Priority Levels

- **Critical**: Must be completed immediately (e.g., emergency contacts)
- **High**: Important for MVP, should be completed soon
- **Medium**: Nice to have for MVP
- **Low**: Future enhancement, not MVP

## Constitutional Compliance

All issues and sprints must comply with project constitutional requirements:
- ✅ TypeScript strict mode
- ✅ No `any` types
- ✅ Testing required
- ✅ Documentation required

---

**Project**: GPL Website
**Tracking System**: Beads v1.0
**Created**: 2026-01-11
