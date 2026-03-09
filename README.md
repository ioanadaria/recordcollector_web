# 💿 My Records - Vinyl Collection Showcase

A beautifully designed web application to browse and manage a curated vinyl record collection. Built as a Codecademy final project with a focus on clean UI/UX and comprehensive test coverage.

## Features

- **Record Gallery** - Display of 44+ vinyl records with detailed information
- **Search & Sort** - Find records quickly by title or artist, sort by alphabetical order or release year
- **Featured Pick** - Rotating featured record display with curated selections
- **Dark Mode** - Toggle-able dark theme with preference persistence
- **Responsive Design** - Mobile-friendly interface that works on all device sizes
- **Rotating Quotes** - Inspiring vinyl-themed quotes throughout the app

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Testing**: Playwright (E2E), pytest (Bug reporting)
- **CI/CD**: GitHub Actions with automated test runs
- **Development**: Python virtual environment with pytest

## Getting Started

### Prerequisites
- Python 3.13+
- Node.js (optional, for additional tooling)

### Installation

1. Clone the repository
```bash
git clone https://github.com/ioanadaria/recordcollector_web.git
cd recordcollector_web
```

2. Create and activate virtual environment
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # macOS/Linux
```

3. Install test dependencies
```bash
pip install pytest playwright pytest-playwright
playwright install --with-deps chromium
```

### Running the Application

Open `index.html` in your browser or use a local server:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`

## Testing

### Run All Tests
```bash
pytest tests/ -v
```

### Run Specific Test Suite
```bash
pytest tests/test_smoke.py -v      # Smoke tests
pytest tests/test_e2e.py -v        # End-to-end tests
pytest tests/test_forms.py -v      # Form validation tests
```

### Test Reports
Auto-generated bug reports are created when tests fail:
- Location: `tests/reports/`
- Format: Markdown with timestamp, error details, and reproduction steps

## Project Structure

```
recordcollector_web/
├── index.html              # Main application page
├── css/
│   └── index.css          # Styling and dark mode
├── js/
│   └── main.js            # Application logic and interactivity
├── tests/
│   ├── test_smoke.py      # Basic functionality tests
│   ├── test_e2e.py        # End-to-end tests
│   ├── test_forms.py      # Form submission tests
│   ├── conftest.py        # Test configuration and fixtures
│   ├── bug_report.py      # Auto-report generator
│   └── reports/           # Auto-generated bug reports
├── .github/workflows/
│   └── tests.yml          # GitHub Actions CI workflow
└── README.md              # This file
```

## CI/CD Pipeline

GitHub Actions automatically:
- Runs the full test suite on every push to `main`
- Generates and uploads bug reports on test failures
- Maintains test coverage documentation

## Future Enhancements

- Backend API for dynamic record data
- User authentication and personal collections
- Social features (sharing, recommendations)
- Advanced filtering and tagging system
- Data persistence with database

## License

This project is part of Codecademy's final project curriculum.
