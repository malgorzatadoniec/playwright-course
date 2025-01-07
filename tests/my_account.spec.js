import { test } from "@playwright/test";

import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { adminDetails } from "../data/userDetails";

test("My account using cookie injection and mocking network request", async ({page}) => {

    const myAccount = new MyAccountPage(page);

    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password); 

    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/JSON",
            body: JSON.stringify({message: "Playwright error from mocking"})
        });
    });

    await myAccount.visit();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode;        // ważne, jeśli chcemy użyć zmiennej, która jest poza funkcją, która używa evaluate, trzeba tak zrobić (loginToken przekazujemy w [] na końcu i dopiero to zostanie przekazane na górę do arg funkcji)
    }, [loginToken]);
    await myAccount.visit();
    await myAccount.waitForErrorMessage();
});

