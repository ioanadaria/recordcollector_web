from playwright.sync_api import Page

def test_search_full_title_returns_one_result(app: Page):
    search = app.locator("#recordSearch")
    search.fill("The Fall - Dragnet")
    card_count = app.locator(".record-card").count()
    assert card_count == 1

def test_search_partial_title_returns_multiple_results(app: Page):
    search = app.locator("#recordSearch")
    search.fill("The Fall")
    card_count = app.locator(".record-card").count()
    assert card_count > 1

def test_search_no_match_shows_message(app: Page):
    search = app.locator("#recordSearch")
    search.fill("zzznomatchzzz")
    no_results = app.locator("#recordGallery p")
    assert no_results.text_content() == "No records found."

def test_search_is_case_insensitive(app: Page):
    search = app.locator("#recordSearch")
    search.fill("THE FALL - DRAGNET")
    card_count = app.locator(".record-card").count()
    assert card_count == 1

def test_search_clear_restores_all_records(app: Page):
    search = app.locator("#recordSearch")
    search.fill("Dragnet")
    assert app.locator(".record-card").count() == 1
    search.click(click_count=3)  # select all text
    search.fill("")               # replace with empty
    assert app.locator(".record-card").count() == 44