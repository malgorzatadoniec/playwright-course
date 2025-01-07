export class LogInPage {

    constructor (page) {
        this.page = page;

        this.goToRegistrationButton = page.locator('[data-qa="go-to-signup-button"]');
    }

    continueToRegistration = async () => {
        await this.goToRegistrationButton.waitFor();
        await this.goToRegistrationButton.click();
        await this.page.waitForURL(/\/signup/, {timeout: 3000})
    }
}