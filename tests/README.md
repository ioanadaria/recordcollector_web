# RecordCollector — Test Suite

Automated test suite for the [RecordCollector web app](../README.md),
built with Playwright and pytest.

---

## What This Suite Covers

| File | Type | What it tests |
| --- | --- | --- |
| `test_smoke.py` | Smoke | Page load, element visibility, record count, search and sort controls present |
| `test_forms.py` | Functional | Search (partial, full, case-insensitive, edge cases), sort (alpha, year asc/desc), filter chips |
| `test_e2e.py` | End-to-end | Featured Pick, Random Pick, search + feature flow, dark mode toggle, full user journey |

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

### Debounce-aware assertions

The search input uses a 300 ms debounce before filtering the gallery. Tests that check card counts after filling the search input use Playwright's auto-retrying assertions (`expect().to_have_count()` / `expect().not_to_have_count()`) instead of `wait_for(state="visible")`. The latter resolves immediately against already-visible cards and fires before the debounce has a chance to re-render the gallery.

---

## CI Integration

The full suite runs automatically via GitHub Actions on every push to `main`.
See [`.github/workflows/tests.yml`](../.github/workflows/tests.yml) for the pipeline configuration.
