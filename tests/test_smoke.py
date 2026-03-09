from playwright.sync_api import Page

def test_page_title_exists(app: Page):
    assert app.title() != ""

def test_record_gallery_is_visible(app: Page):
    gallery = app.locator("#recordGallery")
    assert gallery.is_visible()

def test_records_are_rendered_on_load(app: Page):
    card_count = app.locator(".record-card").count()
    assert card_count == 44  # We know our dataset has 44 records for now

def test_search_input_is_visible(app: Page):
    search = app.locator("#recordSearch")
    assert search.is_visible()

def test_featured_section_exists(app: Page):
    featured = app.locator("#featuredRecord")
    assert featured.is_visible()

def test_dark_mode_button_exists(app: Page):
    toggle = app.locator("#darkModeToggle")
    assert toggle.is_visible()

def test_quote_element_has_text(app: Page):
    quote_text = app.locator("#quote").text_content()
    assert quote_text is not None and quote_text.strip() != ""