import {test} from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

import { ProductsPage } from "../page-objects/ProductsPage.js";
import { Navigation } from "../page-objects/Navigation.js";
import { Checkout } from "../page-objects/Checkout.js";
import { LogInPage } from "../page-objects/LogInPage.js";
import { RegistrationPage } from "../page-objects/RegistrationPage.js";
import { DeliveryDetails } from "../page-objects/DeliveryDetails.js";
import { PaymentPage } from "../page-objects/PaymentPage.js";

import { deliveryDetails as deliveryDetailsData } from "../data/deliveryDetails.js";
import { paymentDetails as paymentDetailsData } from "../data/paymentDetails.js";

test("New user full e2e test journey", async ({page}) => {
    
    const productPage = new ProductsPage(page);
    const navigation = new Navigation(page);
    const checkout = new Checkout(page);
    const login = new LogInPage(page);
    const registration = new RegistrationPage(page);
    const deliveryDetails = new DeliveryDetails(page);
    const paymentPage = new PaymentPage (page);

    await productPage.visit();

    await productPage.sortByCheapest();
    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
    await navigation.goToCheckout();
    await checkout.removeCheapestProduct();
    await checkout.continueToCheckout();

    const email = uuidv4() + "mail.com";
    const password = uuidv4();

    await login.continueToRegistration();
    await registration.signUp(email, password);
    await deliveryDetails.fillDeliveryDetails(deliveryDetailsData);
    await deliveryDetails.saveDetails();
    await deliveryDetails.continueToPayment();
    await paymentPage.activateDiscount();
    await paymentPage.fillOutPaymentDetails(paymentDetailsData);
    await paymentPage.completePayment();
});