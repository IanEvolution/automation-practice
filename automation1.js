const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://demoblaze.com/');

        //wait for the page to load then clicks the login button
        const loginbuttn = await driver.wait(until.elementLocated(By.id('login2')), 5000);
        await driver.wait(until.elementIsVisible(loginbuttn), 5000);
        await driver.wait(async () => await loginbuttn.isEnabled(), 5000);
        await loginbuttn.click();

        //wait for the login modal to appear (anomation issue)
        await driver.sleep(500);
        
        //enters the username
        const usernameField = await driver.findElement(By.id('loginusername'));
        await usernameField.sendKeys('ianholt839@gmail.com');

        //enters the password
        const passwordField = await driver.findElement(By.id('loginpassword'));
        await passwordField.sendKeys('SuperSecretPassword');
        
        //waits for login button to load then clicks it
        const loginButton = await driver.wait(until.elementLocated(By.css('button[onclick="logIn()"]')), 5000);
        await driver.wait(until.elementIsVisible(loginButton), 5000);
        await driver.wait(async () => await loginButton.isEnabled(), 5000);
        await loginButton.click();

        //waits for the home page to load (animation issue)
        await driver.sleep(500);
        
        //clicks the phone requested
        const linktophone = await driver.wait(until.elementLocated(By.css('a[href="prod.html?idp_=6"]')), 5000);
        await driver.wait(until.elementIsVisible(linktophone), 5000);
        await driver.wait(async () => await linktophone.isEnabled(), 5000);
        await linktophone.click();

        // waits for the phones page to load then clicks add to cart
        const addToCartButton = await driver.wait(until.elementLocated(By.css('a[onclick="addToCart(6)"]')), 5000);
        await driver.wait(until.elementIsVisible(addToCartButton), 5000);
        await driver.wait(async () => await addToCartButton.isEnabled(), 5000);
        await addToCartButton.click();

        //wait for the alert to populate
        await driver.wait(until.alertIsPresent(), 5000);
        await driver.switchTo().alert().accept();
        
        //waits for the cart button to load then clicks it
        const cartButton = await driver.wait(until.elementLocated(By.id('cartur')), 5000);
        await driver.wait(until.elementIsVisible(cartButton), 5000);
        await driver.wait(async () => await cartButton.isEnabled(), 5000);
        await cartButton.click();
        
        //waits for the cart page to load then clicks the place order button
        const placeOrderButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(@class,"btn-success") and text()="Place Order"]')), 5000);
        await driver.wait(until.elementIsVisible(placeOrderButton), 5000);
        await driver.wait(async () => await placeOrderButton.isEnabled(), 5000);
        await placeOrderButton.click();
        
        //enters the payment details
        const nameField = await driver.wait(until.elementLocated(By.id('name')), 5000);
        await driver.wait(until.elementIsVisible(nameField), 5000);
        await driver.wait(async () => await nameField.isEnabled(), 5000);
        await nameField.sendKeys('blah name');
        await driver.findElement(By.id('country')).sendKeys('United States');
        await driver.findElement(By.id('city')).sendKeys('phoenix');
        await driver.findElement(By.id('card')).sendKeys('1234567890123456');
        await driver.findElement(By.id('month')).sendKeys('november');
        await driver.findElement(By.id('year')).sendKeys('2025');
        await driver.findElement(By.css('button[onclick="purchaseOrder()"]')).click();

        console.log('thx for the purchase!');

        //just live in the moment
        await driver.sleep(5000);
    } finally {
        // Close the browser after the automation is done
        await driver.quit();
    }
}
)();