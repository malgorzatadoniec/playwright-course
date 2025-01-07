import { expect } from "@playwright/test";

export class PaymentPage {
   
    constructor(page){
        this.page = page;

        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
        this.discountInput = page.locator('[data-qa="discount-code-input"]');
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]');
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]');
        this.totalValue = page.locator('[data-qa="total-value"]');
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]');
        this.cardOwnerInput = page.locator('[data-qa="credit-card-owner"]');
        this.cardNumberInput = page.locator('[data-qa="credit-card-number"]');
        this.validUntilInput = page.locator('[data-qa="valid-until"]');
        this.cvcInput = page.locator('[data-qa="credit-card-cvc"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
    };

    activateDiscount = async () => {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor();

        // option 1
        await this.discountInput.fill(code);
        await expect(this.discountInput).toHaveValue(code);

        // option 2
        // await this.discountInput.focus();
        // await this.page.keyboard.type(code, {delay: 1000});
        // expect(await this.discountInput.inputValue()).toBe(code);

        expect(await this.discountActivatedMessage.isVisible()).toBe(false);

        await this.activateDiscountButton.waitFor();
        await this.activateDiscountButton.click();

        await this.discountActivatedMessage.waitFor();
        const messageText = 'Discount activated!'
        await expect(this.discountActivatedMessage).toHaveText(messageText);

        await this.totalValue.waitFor();
        const totalValue = await this.totalValue.innerText();
        const valueBeforeDiscount = parseInt(totalValue.replace('$',''), 10);
        
        await this.discountedValue.waitFor();
        const discountedValue = await this.discountedValue.innerText();
        const valueAfterDiscount = parseInt(discountedValue.replace('$',''), 10);

        expect (valueBeforeDiscount).toBeGreaterThan(valueAfterDiscount);
    };

    fillOutPaymentDetails = async (paymentDetailsData) => {
        await this.cardOwnerInput.waitFor();
        await this.cardOwnerInput.fill(paymentDetailsData.cardOwnerName);
        await this.cardNumberInput.waitFor();
        await this.cardNumberInput.fill(paymentDetailsData.cardNumber);
        await this.validUntilInput.waitFor();
        await this.validUntilInput.fill(paymentDetailsData.validUntil);
        await this.cvcInput.waitFor();
        await this.cvcInput.fill(paymentDetailsData.cardCvc);
    };

    completePayment = async () => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000});
    };
};