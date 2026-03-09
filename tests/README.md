# RecordCollector Test Suite

Automated test suite for the RecordCollector web application,
built with Playwright and Pytest.

---

## What This Suite Covers

| File | Type | Tests |
|---|---|---|
| `test_smoke.py` | Smoke | Page load, element visibility, record count |
| `test_forms.py` | Functional | Search input, filtering, edge cases |
| `test_e2e.py` | End-to-End | Full user journeys through the app |

---

## Tech Stack

- **Python 3.14**
- **Playwright** — browser automation
- **Pytest** — test runner and assertion framework

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

# Mac/Linux
source .venv/bin/activate
```

**3. Install dependencies**
```bash
pip install pytest playwright pytest-playwright
playwright install
```

---

## Running the Tests

**Run the full suite:**
```bash
pytest tests/ -v
```

**Run a specific file:**
```bash
pytest tests/test_smoke.py -v
pytest tests/test_forms.py -v
pytest tests/test_e2e.py -v
```

**Run a single test:**
```bash
pytest tests/test_smoke.py::test_records_are_rendered_on_load -v
```

---

## Bug Report Generator

When a test fails, a markdown bug report is automatically
generated in `tests/reports/`.

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

No manual reporting needed — failures are documented automatically.

---

## Test Design Approach

Tests are organised in three layers following the
**testing pyramid** principle:

- **Smoke tests** run first and fast — they confirm the app
  is alive and critical elements exist
- **Functional tests** verify specific features behave correctly,
  including edge cases and negative scenarios
- **End-to-end tests** simulate real user journeys from
  start to finish

This layered approach means failures are easy to locate —
if a smoke test fails, there is no point running e2e tests yet.