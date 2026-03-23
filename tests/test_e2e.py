from playwright.sync_api import Page


# ─── helpers ────────────────────────────────────────────────────────────────

def feature_first_card(app: Page) -> str:
    """Click the first record card and return its title. Reused across tests."""
    first_card = app.locator(".record-card").first
    title = first_card.locator("h3").text_content().strip()
    first_card.click()
    return title


# ─── existing tests (fixed) ──────────────────────────────────────────────────

def test_select_record_as_the_pick(app: Page):
    """Clicking a card updates the featured section with that record's title."""
    cards = app.locator(".record-card")
    assert cards.count() > 0

    first_card = cards.first
    expected_title = first_card.locator("h3").text_content().strip()
    first_card.click()

    featured_title = app.locator("#featuredRecord h3").text_content().strip()
    assert featured_title == expected_title


def test_clear_pick_removes_featured_record(app: Page):
    """Clearing the pick hides the featured title and shows the empty message."""
    feature_first_card(app)

    assert app.locator("#featuredRecord h3").is_visible()

    app.locator(".clear-pick-btn").click()

    # Both conditions must hold — not just one
    assert not app.locator("#featuredRecord h3").is_visible()
    assert app.locator(".featured-record-empty-message").is_visible()


def test_search_then_feature_record(app: Page):
    """Searching and clicking a result features the correct record."""
    # "Dragnet" — known record in the dataset, expected to return exactly 1 result
    app.locator("#recordSearch").fill("Dragnet")
    app.locator(".record-card").first.wait_for(state="visible")
    assert app.locator(".record-card").count() == 1

    app.locator(".record-card").first.click()

    featured_title = app.locator("#featuredRecord h3").text_content()
    assert "Dragnet" in featured_title


# ─── new coverage ────────────────────────────────────────────────────────────

def test_featured_pick_persists_during_search(app: Page):
    """Featuring a record then running a search does not clear the featured section."""
    expected_title = feature_first_card(app)

    # Search for something unrelated
    app.locator("#recordSearch").fill("Dragnet")
    app.locator(".record-card").first.wait_for(state="visible")

    featured_title = app.locator("#featuredRecord h3").text_content().strip()
    assert featured_title == expected_title


def test_replace_featured_record_by_clicking_another_card(app: Page):
    """Clicking a second card replaces the featured record with the new selection."""
    cards = app.locator(".record-card")
    assert cards.count() >= 2

    # Feature the first card
    first_title = cards.nth(0).locator("h3").text_content().strip()
    cards.nth(0).click()
    assert app.locator("#featuredRecord h3").text_content().strip() == first_title

    # Feature a different card
    second_title = cards.nth(1).locator("h3").text_content().strip()
    cards.nth(1).click()

    featured_title = app.locator("#featuredRecord h3").text_content().strip()
    assert featured_title == second_title
    assert featured_title != first_title


def test_search_no_results(app: Page):
    """Searching for a string that matches no records shows an empty state."""
    app.locator("#recordSearch").fill("zzz_no_such_record_zzz")

    # No cards should be visible
    no_results = app.locator("#recordGallery p")
    no_results.wait_for(state="visible")
    assert app.locator(".record-card").count() == 0

    # App should surface a no-results message rather than silently showing nothing
    assert no_results.text_content() == "No records found."


def test_clear_search_restores_full_gallery(app: Page):
    """Clearing the search input after filtering restores all record cards."""
    total = app.locator(".record-card").count()

    app.locator("#recordSearch").fill("Dragnet")
    app.locator(".record-card").first.wait_for(state="visible")
    assert app.locator(".record-card").count() < total

    # Clear the input
    app.locator("#recordSearch").fill("")
    app.locator(".record-card").nth(total - 1).wait_for(state="visible")
    assert app.locator(".record-card").count() == total


def test_dark_mode_toggles_on_and_off(app: Page):
    """Dark mode toggle applies and removes the dark-mode class on the document body."""
    body = app.locator("body")

    # Confirm light mode is the default state
    assert not body.evaluate("el => el.classList.contains('dark-mode')")

    # Toggle on
    app.locator("#darkModeToggle").click()
    assert body.evaluate("el => el.classList.contains('dark-mode')")

    # Toggle off
    app.locator("#darkModeToggle").click()
    assert not body.evaluate("el => el.classList.contains('dark-mode')")


def test_full_user_journey(app: Page):
    """
    Simulates a complete user session:
    arrive → browse → search → feature a result → clear → confirm empty state.
    """
    # Arrive: gallery is populated
    assert app.locator(".record-card").count() > 0

    # Browse: featured section starts empty
    assert app.locator(".featured-record-empty-message").is_visible()

    # Search: filter down to one result
    # "Dragnet" — known record in the dataset
    app.locator("#recordSearch").fill("Dragnet")
    app.locator(".record-card").first.wait_for(state="visible")
    assert app.locator(".record-card").count() == 1

    # Feature: click the result
    app.locator(".record-card").first.click()
    assert "Dragnet" in app.locator("#featuredRecord h3").text_content()

    # Clear: remove the featured pick
    app.locator(".clear-pick-btn").click()
    assert app.locator(".featured-record-empty-message").is_visible()
    assert not app.locator("#featuredRecord h3").is_visible()