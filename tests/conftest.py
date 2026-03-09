import pytest
import os
from playwright.sync_api import Page
from bug_report import generate_bug_report

@pytest.fixture
def app(page: Page):
    base_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), '..', 'index.html')
    )
    page.goto(f"file:///{base_path}")
    yield page

# This is a Pytest HOOK
# Pytest calls this automatically after EVERY test
# "report" contains the result — passed, failed, or skipped
def pytest_runtest_logreport(report):

    # We only care about the "call" phase (the actual test run)
    # and only when it failed
    if report.when == "call" and report.failed:

        # report.nodeid looks like:
        # "tests/test_smoke.py::test_page_title_exists[chromium]"
        test_name = report.nodeid

        # report.longreprtext is the full error message
        error_message = str(report.longrepr)

        # Call our generator
        generate_bug_report(test_name, error_message)