# RecordCollector — Test Suite

Automated test suite for the [RecordCollector web app](../README.md),
built with Playwright and pytest.

---

## What This Suite Covers

| File | Type | What it tests |
|---|---|---|
| `test_smoke.py` | Smoke | Page load, element visibility, record count, search and sort controls |
| `test_forms.py` | Functional | Search input, filtering, edge cases |
| `test_e2e.py` | End-to-end | Full user journeys through the app |

---

## Tech Stack

- **Python 3.13**
- **Playwright** — browser automation
- **pytest** — test runner and assertion framework
- **pytest-playwright** — Playwright fixtures for pytest

---

## Setup

**1. Clone the repository**
```bash
git clone https://github.com/ioanadaria/recordcollector_web.git
cd recordcollector_web
```

**2. Create and activate a virtual environment**
```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
playwright install --with-deps chromium
```

---

## Running the Tests

**Full suite:**
```bash
pytest
```

**Single file:**
```bash
pytest tests/test_smoke.py
pytest tests/test_forms.py
pytest tests/test_e2e.py
```

**Single test:**
```bash
pytest tests/test_smoke.py::test_records_are_rendered_on_load
```

---

## Auto Bug Report Generator

When a test fails, a Markdown bug report is automatically saved to `tests/reports/`.

Each report includes:
- Test name and timestamp
- Full error message
- Steps to reproduce
- Expected vs actual result
- Environment details

Example output:
```
📋 Bug report saved: tests/reports/bug_report_2026-03-09_17-20-32.md
```

Reports are gitignored — they are generated locally and uploaded as CI artifacts when the pipeline fails.

---

## Test Design Approach

Tests follow the **testing pyramid**:

```
        /\
       /  \
      / E2E \        ← fewer, slower, full user journeys
     /--------\
    / Functional\    ← feature-level, includes edge cases
   /------------\
  /    Smoke     \   ← fast, runs first, confirms app is alive
 /______________\
```

- **Smoke tests** run first — if these fail, nothing else is worth running yet
- **Functional tests** verify specific features including negative and edge case scenarios
- **End-to-end tests** simulate real user behaviour from start to finish

This layered structure means failures are fast to locate and cheap to fix early.

---

## CI Integration

The full suite runs automatically via GitHub Actions on every push to `main`.
See [`.github/workflows/tests.yml`](../.github/workflows/tests.yml) for the pipeline configuration.
