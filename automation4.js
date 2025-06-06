const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();
    try{

        //the site used for testing
        await driver.get('https://demoblaze.com/');

        //login
        const loginButton = await driver.wait(until.elementLocated(By.id('login2')), 5000);
        await driver.wait(until.elementIsVisible(loginButton), 5000);
        await driver.wait(async () => await loginButton.isEnabled(), 5000);
        await loginButton.click();

        //wait for animation to end
        await driver.sleep(500);

        //enter log in details
        const usernamField = await driver.wait(until.elementLocated(By.id('loginusername')), 5000);
        await driver.wait(until.elementIsVisible(usernamField), 5000);
        await driver.wait(async () => await usernamField.isEnabled(), 5000);
        await usernamField.sendKeys('ianholt839@gmail.com');

        const passwordField = await driver.wait(until.elementLocated(By.id('loginpassword')), 5000);
        await driver.wait(until.elementIsVisible(passwordField), 5000);
        await driver.wait(async () => await passwordField.isEnabled(), 5000);
        await passwordField.sendKeys('SuperSecretPassword');

        //click login button
        await driver.findElement(By.css('button[onclick="logIn()"]')).click();

        // wait for animation to end
        await driver.sleep(500);

        //navigate to the "laptops" category
        const Laptops = await driver.wait(until.elementLocated(By.xpath('//a[contains(@class,"list-group-item") and text()="Laptops"]')), 5000);
        await driver.wait(until.elementIsVisible(Laptops), 5000);
        await driver.wait(async () => await Laptops.isEnabled(), 5000);
        await Laptops.click();


        //select the "Sony vaio i5" laptop
        const sonyViaoLink = await driver.wait(until.elementLocated(By.css('a[href="prod.html?idp_=8"]')),5000);
        await driver.wait(until.elementIsVisible(sonyViaoLink), 5000);
        await driver.wait(async () => await sonyViaoLink.isEnabled(), 5000);
        await sonyViaoLink.click();

        //add the laptop to the cart
        const addToCart = await driver.wait(until.elementLocated(By.css('a[onclick="addToCart(8)"]')), 5000);
        await driver.wait(until.elementIsVisible(addToCart), 5000);
        await driver.wait(async () => await addToCart.isEnabled(), 5000);
        await addToCart.click();

        //accept the alert
        await driver.wait(until.alertIsPresent(), 5000);
        await driver.switchTo().alert().accept();

        //go to cart
        await driver.findElement(By.css('a[href="cart.html"]')).click();

        //click "place order"
        const placeOrderButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(@class,"btn-success") and text()="Place Order"]')), 5000);
        await driver.wait(until.elementIsVisible(placeOrderButton), 5000);
        await driver.wait(async () => await placeOrderButton.isEnabled(), 5000);
        await placeOrderButton.click();

        // animation for pay details 
        await driver.sleep(500);
        
        //fill out the payment details
        await driver.findElement(By.id('name')).sendKeys('blah name');
        await driver.findElement(By.id('country')).sendKeys('United States');
        await driver.findElement(By.id('city')).sendKeys('Tempe');
        await driver.findElement(By.id('card')).sendKeys('5555555555555555');
        await driver.findElement(By.id('month')).sendKeys('november');
        await driver.findElement(By.id('year')).sendKeys('2025');

        //submit order
        await driver.findElement(By.css('button[onclick="purchaseOrder()"]')).click();

        //post in console log and relish the completed automation
        console.log("ALL DONE!");
        await driver.sleep(5000);

    }
    finally {
        //close the browser
        await driver.quit();
    }
}
)();