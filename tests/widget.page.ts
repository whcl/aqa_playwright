import {Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = '[data-test="button_feedback_form"]', //изменил локатор
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = '[class^=articles__]',
    ARTICLE_POPULAR_LIST_ITEM = 'ul[class^=articles__] li', //изменил локатор
	BUTTON_RETURN = '[data-test=button_back]', //добавил локатор
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

	async getPopularArticles() {
			const locator = this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
			await locator.first().waitFor({ state: 'attached', timeout: 10000 }).catch(() => { //добавил ожидание
				console.log('No popular articles found');
			});
			return locator.all();
		}

    async clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }
	
	async returnButton(){ //добавил метод
		return this.wrapper().locator(WidgetPage.selector.BUTTON_RETURN).click();
	}

    getWidgetBody() { 
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }
}

