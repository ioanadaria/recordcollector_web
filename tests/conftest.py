import pytest
import os
from playwright.sync_api import Page

@pytest.fixture
def app(page: Page):
    base_path = os.path.abspath(
        os.path.join(os.path.dirname(__file__), '..', 'index.html')
    )
    page.goto(f"file:///{base_path}")
    yield page