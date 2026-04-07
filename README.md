# 💿 RecordCollector Web

[![CI](https://github.com/ioanadaria/recordcollector_web/actions/workflows/tests.yml/badge.svg)](https://github.com/ioanadaria/recordcollector_web/actions/workflows/tests.yml)

A responsive vinyl record collection app with a full automated test suite, CI/CD pipeline, and automatic bug report generation on test failures.

> 🔴 **[Live Demo](https://ioanadaria.github.io/recordcollector_web)** &nbsp;·&nbsp; 📋 **[Test Suite Docs](tests/README.md)**

---

## Features

- **Record Gallery** — browse 44+ vinyl records with titles, artists, and release years
- **Search & Sort** — filter by title or artist, sort alphabetically or by year
- **Featured Pick** — click any record card to feature it; selection persists across sessions via localStorage
- **Dark Mode** — toggleable theme with preference persistence via localStorage
- **Responsive Design** — mobile-friendly layout across all screen sizes
- **Vinyl Quotes** — rotating quotes throughout the UI

---

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Testing | Playwright (E2E + functional), pytest (test runner) |
| CI/CD | GitHub Actions — runs full suite on every push to `main` |
| Bug Reporting | Auto-generated Markdown reports on test failure |

---

## Getting Started

### Prerequisites

- Python 3.13+
- Git

### Installation

```bash
git clone https://github.com/ioanadaria/recordcollector_web.git
cd recordcollector_web
```

```bash
python -m venv .venv
.venv\Scripts\activate    # Windows
source .venv/bin/activate # macOS/Linux
```

```bash
pip install -r requirements.txt
playwright install --with-deps chromium
```

### Run the App

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Testing

The test suite follows the **testing pyramid** — smoke tests run first, then functional, then end-to-end. See [`tests/README.md`](tests/README.md) for full documentation.

```bash
pytest                              # full suite
pytest tests/test_smoke.py          # smoke tests only
pytest tests/test_e2e.py            # end-to-end tests only
pytest tests/test_forms.py          # form and input validation
```

### Auto Bug Reports

When any test fails, a Markdown bug report is automatically generated in `tests/reports/` with the test name, timestamp, error message, reproduction steps, and environment details — no manual reporting needed.

```text
📋 Bug report saved: tests/reports/bug_report_2026-03-09_17-20-32.md
```

---

## Project Structure

```text
recordcollector_web/
├── index.html                  # Main application page
├── css/
│   └── index.css               # Styling and dark mode
├── js/
│   └── main.js                 # Application logic
├── tests/
│   ├── README.md               # Test suite documentation
│   ├── conftest.py             # Fixtures and configuration
│   ├── test_smoke.py           # Smoke tests
│   ├── test_forms.py           # Functional / input tests
│   ├── test_e2e.py             # End-to-end user journey tests
│   ├── bug_report.py           # Auto bug report generator
│   └── reports/                # Generated reports (gitignored)
├── .github/
│   └── workflows/
│       └── tests.yml           # CI workflow
├── pytest.ini                  # pytest configuration
├── requirements.txt            # Pinned test dependencies
└── README.md
```

---

## CI/CD Pipeline

GitHub Actions runs on every push to `main`:

1. Sets up Python and installs dependencies
2. Installs Playwright browsers
3. Runs the full test suite
4. On failure: generates a bug report and uploads it as a build artifact

---

## Roadmap

- [ ] Backend API for dynamic record data
- [ ] User authentication and personal collections
- [ ] Advanced filtering and tagging
- [ ] Data persistence with a database
- [ ] Social features (sharing, recommendations)
