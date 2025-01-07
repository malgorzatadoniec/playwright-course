import { expect } from "@playwright/test";
import { Navigation } from "./Navigation.js";
import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class ProductsPage {

    constructor(page) {
        this.page = page;

        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
        this.addButtons = page.locator('[data-qa="product-button"]');
        this.productTitle = page.locator('[data-qa="product-title"]');
    };
    

    visit = async () => {
        await this.page.goto('/');
    };

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();
        const productTitlesBeforSort = await this.productTitle.allInnerTexts();
        const sortAsc = "price-asc";
        await this.sortDropdown.selectOption(sortAsc);
        const productTitlesAfterrSort = await this.productTitle.allInnerTexts();

        expect(productTitlesAfterrSort).not.toEqual(productTitlesBeforSort);
    };

    addProductToBasket = async (index) => {

        const navigation = new Navigation(this.page);

        const specificAddButton = this.addButtons.nth(index);

        await specificAddButton.waitFor();
        await expect(specificAddButton).toHaveText("Add to Basket");
        let basketCountBeforeAdding 
        // only desktop view
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount();
        };    
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket");
        // only desktop view
        if (isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount();
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
        };
    };
};

