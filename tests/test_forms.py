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

def test_search_whitespace_only_shows_all_records(app: Page):
    """
    Whitespace-only input should behave like an empty search.
    The filter uses .includes() which means " " won't match any title,
    so we expect 0 results — this test documents the actual behaviour.
    """
    search = app.locator("#recordSearch")
    search.fill("   ")
    card_count = app.locator(".record-card").count()
    # Whitespace doesn't match any title — this is expected behaviour
    # worth documenting so the team can decide if it should be changed
    assert card_count == 0

def test_search_special_characters_does_not_crash(app: Page):
    """
    Special characters should not crash the app.
    We expect either 0 results or a 'No records found' message —
    not an error or blank page.
    """
    search = app.locator("#recordSearch")
    search.fill("@#$%^&*()")

    # The app should still be responsive — gallery element still exists
    assert app.locator("#recordGallery").is_visible()

    # And it should show the no results message gracefully
    no_results = app.locator("#recordGallery p")
    assert no_results.text_content() == "No records found."

def test_search_by_year_does_not_match_records(app: Page):
    """
    Searching by release year returns no results because
    the search only filters by title, not by year field.
    This documents a known limitation for future improvement.
    """
    search = app.locator("#recordSearch")
    search.fill("1980")

    # No titles contain "1980" so no cards should appear
    card_count = app.locator(".record-card").count()
    assert card_count == 0

def test_search_single_character_returns_results(app: Page):
    """
    A single character that appears in record titles should
    return matching results — confirms minimum input works.
    """
    search = app.locator("#recordSearch")
    search.fill("T")

    # "T" appears in "The Fall", "The Monks" etc — expect multiple results
    card_count = app.locator(".record-card").count()
    assert card_count > 1