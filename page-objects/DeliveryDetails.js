import { expect } from "@playwright/test";

export class DeliveryDetails {

    constructor (page) {

        this.page = page;

        this.firstName = page.locator('[data-qa="delivery-first-name"]');
        this.lastName = page.locator('[data-qa="delivery-last-name"]');
        this.street = page.locator('[data-qa="delivery-address-street"]');
        this.postalCode = page.locator('[data-qa="delivery-postcode"]');
        this.city = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressButton = page.locator('[data-qa="save-address-button"]');
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]');
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]');
        this.saveAddressLastName = page.locator('[data-qa="saved-address-lastName"]');
        this.saveAddressStreet = page.locator('[data-qa="saved-address-street"]');
        this.saveAddressPostalCode = page.locator('[data-qa="saved-address-postcode"]');
        this.saveAddressCity = page.locator('[data-qa="saved-address-city"]');
        this.saveAddressCountry = page.locator('[data-qa="saved-address-country"]');
        this.continueButton = page.locator('[data-qa="continue-to-payment-button"]');
    };

    fillDeliveryDetails = async (deliveryDetailsData) => {
        await this.firstName.waitFor();
        await this.firstName.fill(deliveryDetailsData.name);
        await this.lastName.waitFor();
        await this.lastName.fill(deliveryDetailsData.surname);
        await this.street.waitFor();
        await this.street.fill(deliveryDetailsData.street);
        await this.postalCode.waitFor();
        await this.postalCode.fill(deliveryDetailsData.postalCode)
        await this.city.waitFor();
        await this.city.fill(deliveryDetailsData.city);
        await this.countryDropdown.waitFor();
        const country = deliveryDetailsData.country;
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption(country);

    };

    saveDetails = async () => {
        const addresCountBeforeSaving = await this.savedAddressContainer.count();
        await this.saveAddressButton.waitFor();
        await this.saveAddressButton.click();
        await this.savedAddressContainer.waitFor();
        await expect(this.savedAddressContainer).toHaveCount(addresCountBeforeSaving + 1);

        await this.savedAddressFirstName.first().waitFor();
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstName.inputValue());
        await this.saveAddressLastName.first().waitFor();
        expect(await this.saveAddressLastName.first().innerText()).toBe(await this.lastName.inputValue());
        await this.saveAddressStreet.first().waitFor();
        expect(await this.saveAddressStreet.first().innerText()).toBe(await this.street.inputValue());
        await this.saveAddressPostalCode.first().waitFor();
        expect(await this.saveAddressPostalCode.first().innerText()).toBe(await this.postalCode.inputValue());
        await this.saveAddressCity.first().waitFor();
        expect(await this.saveAddressCity.first().innerText()).toBe(await this.city.inputValue());
        await this.saveAddressCountry.first().waitFor();
        expect(await this.saveAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());
    };

    continueToPayment = async () => {
        await this.continueButton.waitFor();
        await this.continueButton.click();
        await this.page.waitForURL(/\/payment/, {timeout: 3000});
    };
};