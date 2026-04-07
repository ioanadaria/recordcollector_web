from playwright.sync_api import Page, expect


def test_search_full_title_returns_one_result(app: Page):
    search = app.locator("#recordSearch")
    search.fill("The Fall - Dragnet")
    expect(app.locator(".record-card")).to_have_count(1)


def test_search_partial_title_returns_multiple_results(app: Page):
    search = app.locator("#recordSearch")
    search.fill("The Fall")
    app.locator(".record-card").first.wait_for(state="visible")
    assert app.locator(".record-card").count() > 1


def test_search_no_match_shows_message(app: Page):
    search = app.locator("#recordSearch")
    search.fill("zzznomatchzzz")
    no_results = app.locator("[data-testid='no-results']")
    no_results.wait_for(state="visible")
    assert no_results.text_content() == "No records found."


def test_search_is_case_insensitive(app: Page):
    search = app.locator("#recordSearch")
    search.fill("THE FALL - DRAGNET")
    expect(app.locator(".record-card")).to_have_count(1)


def test_search_clear_restores_all_records(app: Page):
    search = app.locator("#recordSearch")
    total = app.locator(".record-card").count()

    search.fill("Dragnet")
    app.locator(".record-card").first.wait_for(state="visible")
    assert app.locator(".record-card").count() < total

    search.fill("")
    app.locator(".record-card").nth(total - 1).wait_for(state="visible")
    assert app.locator(".record-card").count() == total


def test_search_whitespace_only_returns_no_results(app: Page):
    """
    Whitespace-only input should behave like an empty search.
    The filter uses .includes() which means "   " won't match any title,
    so we expect 0 results — this test documents the actual behaviour.
    Worth revisiting if the app adds .trim() to the search logic.
    """
    search = app.locator("#recordSearch")
    search.fill("   ")
    no_results = app.locator("[data-testid='no-results']")
    no_results.wait_for(state="visible")
    assert app.locator(".record-card").count() == 0


def test_search_special_characters_does_not_crash(app: Page):
    """
    Special characters should not crash the app.
    We expect either 0 results or a 'No records found' message —
    not an error or blank page.
    """
    search = app.locator("#recordSearch")
    search.fill("@#$%^&*()")

    # App should still be responsive — gallery element still present
    assert app.locator("#recordGallery").is_visible()

    # No-results message should appear gracefully
    no_results = app.locator("[data-testid='no-results']")
    no_results.wait_for(state="visible")
    assert no_results.text_content() == "No records found."


def test_search_by_year_does_not_match_records(app: Page):
    """
    Searching by release year returns no results because
    the search only filters by title, not by year field.
    This documents a known limitation for future improvement.
    """
    search = app.locator("#recordSearch")
    search.fill("1980")
    no_results = app.locator("[data-testid='no-results']")
    no_results.wait_for(state="visible")
    assert app.locator(".record-card").count() == 0


def test_search_single_character_returns_results(app: Page):
    """
    A single character that appears in record titles should
    return matching results — confirms minimum input works.
    """
    search = app.locator("#recordSearch")
    search.fill("T")
    app.locator(".record-card").first.wait_for(state="visible")
    # "T" appears in "The Fall", "The Monks" etc — expect multiple results
    assert app.locator(".record-card").count() > 1


# ==== Sort tests ====

def test_sort_alphabetical_orders_records(app: Page):
    app.locator("#sortDropdown").select_option("alphabetical")
    app.locator(".record-card").first.wait_for(state="visible")
    titles = app.locator(".record-card h3")
    first = titles.nth(0).text_content().lower()
    second = titles.nth(1).text_content().lower()
    assert first <= second


def test_sort_release_year_newest_first(app: Page):
    app.locator("#sortDropdown").select_option("release-year")
    app.locator(".record-card").first.wait_for(state="visible")

    def get_year(card_index):
        details = app.locator(".record-card").nth(card_index).locator(".detail-item")
        for i in range(details.count()):
            text = details.nth(i).text_content()
            if "Released:" in text:
                return int(text.split("Released:")[1].strip())
        return 0

    assert get_year(0) >= get_year(1)


def test_sort_release_year_oldest_first(app: Page):
    app.locator("#sortDropdown").select_option("release-year-old")
    app.locator(".record-card").first.wait_for(state="visible")

    def get_year(card_index):
        details = app.locator(".record-card").nth(card_index).locator(".detail-item")
        for i in range(details.count()):
            text = details.nth(i).text_content()
            if "Released:" in text:
                return int(text.split("Released:")[1].strip())
        return 0

    assert get_year(0) <= get_year(1)


def test_sort_default_shows_all_records(app: Page):
    total = app.locator(".record-card").count()
    app.locator("#sortDropdown").select_option("alphabetical")
    app.locator("#sortDropdown").select_option("default")
    app.locator(".record-card").nth(total - 1).wait_for(state="visible")
    assert app.locator(".record-card").count() == total