import pytest
from pathlib import Path
from playwright.sync_api import Page
from bug_report import generate_bug_report


@pytest.fixture
def app(page: Page):
    base_path = Path(__file__).parent.parent / "index.html"
    page.goto(base_path.as_uri())
    yield page


# Pytest hook — called automatically after every test.
# "report" contains the result: passed, failed, or skipped.
def pytest_runtest_logreport(report):

    # Only act on the "call" phase (the actual test body, not setup/teardown)
    # and only when it failed.
    if report.when == "call" and report.failed:

        # report.nodeid example:
        # "tests/test_smoke.py::test_page_title_exists[chromium]"
        test_name = report.nodeid

        # report.longrepr is a rich object — str() flattens it to the full
        # traceback. Passed separately so bug_report.py can use both if needed.
        error_message = str(report.longrepr)

        generate_bug_report(test_name, error_message)