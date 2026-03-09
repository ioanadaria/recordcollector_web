from playwright.sync_api import Page

def test_select_record_as_the_pick(app: Page):
    # Confirm records loaded
    cards = app.locator(".record-card")
    assert cards.count() > 0

    # Get the title of the first card BEFORE clicking
    first_card = cards.first
    expected_title = first_card.locator("h3").text_content()

    # Click it
    first_card.click()

    # Check The Pick section updated with that title
    featured_title = app.locator("#featuredRecord h3").text_content()
    assert featured_title == expected_title

def test_clear_pick_removes_featured_record(app: Page):
    # Feature a record first
    app.locator(".record-card").first.click()

    # Confirm it appeared
    assert app.locator("#featuredRecord h3").is_visible()

    # Click Clear Pick
    app.locator(".clear-pick-btn").click()

    # Empty message should now show
    empty_msg = app.locator(".featured-record-empty-message")
    assert empty_msg.is_visible()

def test_search_then_feature_record(app: Page):
    # Search for a specific record
    app.locator("#recordSearch").fill("Dragnet")
    assert app.locator(".record-card").count() == 1

    # Click it
    app.locator(".record-card").first.click()

    # Featured section should contain "Dragnet"
    featured_title = app.locator("#featuredRecord h3").text_content()
    assert "Dragnet" in featured_title