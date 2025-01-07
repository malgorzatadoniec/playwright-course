export class MyAccountPage {

    constructor (page){
        this.page = page;

        this.myAccountHeader = page.getByRole('heading', { name: 'My Account' });
        this.errorMessage = page.locator('[data-qa="error-message"]');
    };

    visit = async () => {
        await this.page.goto("/my-account");
        await this.myAccountHeader.waitFor();
    };

    waitForErrorMessage = async () => {
        await this.errorMessage.waitFor();
    };
};