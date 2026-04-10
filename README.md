# 💿 RecordCollector Web

[![CI](https://github.com/ioanadaria/recordcollector_web/actions/workflows/tests.yml/badge.svg)](https://github.com/ioanadaria/recordcollector_web/actions/workflows/tests.yml)

A responsive vinyl record collection app with a full automated test suite, CI/CD pipeline, and automatic bug report generation on test failures.

> 🔴 **[Live Demo](https://ioanadaria.github.io/recordcollector_web)** &nbsp;·&nbsp; 📋 **[Test Suite Docs](tests/README.md)**

---

## Features

- **Record Gallery** — browse 50+ vinyl records with titles, labels, formats, countries, release years, and styles
- **Search & Sort** — filter by title or artist, sort alphabetically or by release year (newest/oldest)
- **Format & Era Filters** — filter chips for format (LP, 7", 12", Box Set) and era (Pre-1985, 1985–2000, 2000+); filters combine with search and sort
- **Collection Stats Bar** — live summary showing total records, artist count, year range, and formats present
- **The Pick** — click any record card to feature it in a landscape card showing full details; selection persists via localStorage
- **Random Pick** — "🎲 Random Pick" button instantly picks a random record from the collection and scrolls to The Pick section
- **Dark Mode** — toggleable warm-brown theme with preference persistence via localStorage
- **Responsive Design** — mobile-friendly layout; The Pick card switches from landscape to portrait on narrow screens
- **Vinyl Quotes** — rotating quotes in the hero banner

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
pytest tests/test_forms.py          # search, filter, and sort validation
```

### Test Coverage

| File | Type | What it tests |
| --- | --- | --- |
| `test_smoke.py` | Smoke | Page load, element visibility, record count, controls present |
| `test_forms.py` | Functional | Search (partial, full, case-insensitive, edge cases), sort, filter chips |
| `test_e2e.py` | End-to-end | Featured Pick, Random Pick, search + feature flow, dark mode, full user journey |

### Known Behaviour — Debounce

The search input uses a 300 ms debounce. All search-related tests use `expect().to_have_count()` or `expect().not_to_have_count()` (Playwright's auto-retrying assertions) rather than `wait_for(state="visible")`, which would resolve before the debounce fires.

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
│   └── index.css               # Styling, dark mode, responsive layout
├── js/
│   └── main.js                 # Application logic, record data, filters
├── images/                     # Album cover art (50 JPGs)
│   ├── The-Fall-*.jpg
│   ├── Can-*.jpg
│   ├── Foetus-*.jpg
│   └── ...
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
│       ├── tests.yml           # CI workflow — runs test suite on push
│       └── deploy.yml          # Deploy workflow
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

- [ ] Wantlist section — a separate wishlist of records to hunt for
- [ ] Collection timeline — visual year-by-year breakdown of releases
- [ ] Artist breakdown — per-artist record count and stats
- [ ] Discogs deep-link — link each record card directly to its Discogs page
- [ ] "Now Listening" status — pin a currently playing record with a visual indicator
- [ ] Backend API for dynamic record data
- [ ] User authentication and personal collections
- [ ] Data persistence with a database
- [ ] Social features (sharing, recommendations)
