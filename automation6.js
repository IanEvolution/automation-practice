const fs = require('fs');
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();
    try { 
        // open the site
        await driver.get('https://demoblaze.com/');

        // login button
        const loginButton = await driver.wait(until.elementLocated(By.id('login2')), 5000);
        await driver.wait(until.elementIsVisible(loginButton), 5000);
        await driver.wait(async () => await loginButton.isEnabled(), 5000);
        await loginButton.click();

        // animation delay 
        await driver.sleep(500);
        
        // login details 
        const usernameInput = await driver.wait(until.elementLocated(By.id('loginusername')), 5000);
        await driver.wait(until.elementIsVisible(usernameInput), 5000);
        await driver.wait(async () => await usernameInput.isEnabled(), 5000);
        await usernameInput.sendKeys('ianholt839@gmail.com');
        await driver.findElement(By.id('loginpassword')).sendKeys('SuperSecretPassword');

        await driver.findElement(By.css('button[onclick="logIn()"]')).click();

        // FORCE AN ERROR
        //await driver.findElement(By.id('this item does not exist'));

        // animation delay again
        await driver.sleep(500);

        // navigate to phone section
        const phoneSection = await driver.wait(until.elementLocated(By.xpath('//a[contains(@class,"list-group-item") and text()="Phones"]')), 5000);
        await driver.wait(until.elementIsVisible(phoneSection), 5000);
        await driver.wait(async () => await phoneSection.isEnabled(), 5000);
        await phoneSection.click();
        
        // select phone
        const phoneLink = await driver.wait(until.elementLocated(By.css('a[href="prod.html?idp_=7"]')), 5000);
        await driver.wait(until.elementIsVisible(phoneLink), 5000);
        await driver.wait(async () => await phoneLink.isEnabled(), 5000);
        await phoneLink.click();

        // add to cart
        const addToCartButtonPhone = await driver.wait(until.elementLocated(By.css('a[onclick="addToCart(7)"]')), 5000);
        await driver.wait(until.elementIsVisible(addToCartButtonPhone), 5000);
        await driver.wait(async () => await addToCartButtonPhone.isEnabled(), 5000);
        await addToCartButtonPhone.click();

        // accept alert
        await driver.wait(until.alertIsPresent(), 5000);
        await driver.switchTo().alert().accept();

        // click home button 
        await driver.findElement(By.css('a[href="index.html"]')).click();

        // navigate to laptop section 
        const laptopSection = await driver.wait(until.elementLocated(By.xpath('//a[contains(@class,"list-group-item") and text()="Laptops"]')), 5000);
        await driver.wait(until.elementIsVisible(laptopSection), 5000);
        await driver.wait(async () => await laptopSection.isEnabled(), 5000);
        await laptopSection.click();

        // select laptop 
        const laptopLink = await driver.wait(until.elementLocated(By.css('a[href="prod.html?idp_=11"]')), 5000);
        await driver.wait(until.elementIsVisible(laptopLink), 5000);
        await driver.wait(async () => await laptopLink.isEnabled(), 5000);
        await laptopLink.click();

        // add to cart
        const addToCartButtonLaptop = await driver.wait(until.elementLocated(By.css('a[onclick="addToCart(11)"]')), 5000);
        await driver.wait(until.elementIsVisible(addToCartButtonLaptop), 5000);
        await driver.wait(async () => await addToCartButtonLaptop.isEnabled(), 5000);
        await addToCartButtonLaptop.click();

        // accept alert
        await driver.wait(until.alertIsPresent(), 5000);
        await driver.switchTo().alert().accept();

        // click home button
        await driver.findElement(By.css('a[href="index.html"]')).click();

        // navigate to monitor section
        const monitorSection = await driver.wait(until.elementLocated(By.xpath('//a[contains(@class,"list-group-item") and text()="Monitors"]')), 5000);
        await driver.wait(until.elementIsVisible(monitorSection), 5000);
        await driver.wait(async () => await monitorSection.isEnabled(), 5000);
        await monitorSection.click();

        // select monitor
        const monitorLink = await driver.wait(until.elementLocated(By.css('a[href="prod.html?idp_=10"]')), 5000);
        await driver.wait(until.elementIsVisible(monitorLink), 5000);
        await driver.wait(async () => await monitorLink.isEnabled(), 5000);
        await monitorLink.click();

        // add to cart
        const addToCartButtonMonitor = await driver.wait(until.elementLocated(By.css('a[onclick="addToCart(10)"]')), 5000);
        await driver.wait(until.elementIsVisible(addToCartButtonMonitor), 5000);
        await driver.wait(async () => await addToCartButtonMonitor.isEnabled(), 5000);
        await addToCartButtonMonitor.click();

        // accept alert
        await driver.wait(until.alertIsPresent(), 5000);
        await driver.switchTo().alert().accept();

        // click cart button
        await driver.findElement(By.id('cartur')).click();

        // wait for cart to load then click place order
        const placeOrderButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(@class,"btn-success") and text()="Place Order"]')), 5000);
        await driver.wait(until.elementIsVisible(placeOrderButton), 5000);
        await driver.wait(async () => await placeOrderButton.isEnabled(), 5000);
        await placeOrderButton.click();

        // fill in payment details
        const nameField = await driver.wait(until.elementLocated(By.id('name')), 5000);
        await driver.wait(until.elementIsVisible(nameField), 5000);
        await driver.wait(async () => await nameField.isEnabled(), 5000);
        await nameField.sendKeys('WRONG name');
        await driver.findElement(By.id('country')).sendKeys('WRONG country');
        await driver.findElement(By.id('city')).sendKeys('WRONG city');
        await driver.findElement(By.id('card')).sendKeys('WRONG card');
        await driver.findElement(By.id('month')).sendKeys('WRONG month');
        await driver.findElement(By.id('year')).sendKeys('WRONG year');

        // wait for to see the feilds to test clear function
        await driver.sleep(2000);

        // clear the payment details
        await nameField.clear();
        await driver.findElement(By.id('country')).clear();
        await driver.findElement(By.id('city')).clear();
        await driver.findElement(By.id('card')).clear();
        await driver.findElement(By.id('month')).clear();
        await driver.findElement(By.id('year')).clear();

        // fill in correct payment details
        await nameField.sendKeys('blah name');
        await driver.findElement(By.id('country')).sendKeys('United States');
        await driver.findElement(By.id('city')).sendKeys('phoenix');
        await driver.findElement(By.id('card')).sendKeys('1234567890123456');
        await driver.findElement(By.id('month')).sendKeys('november');
        await driver.findElement(By.id('year')).sendKeys('2025');
        await driver.findElement(By.css('button[onclick="purchaseOrder()"]')).click();

        // console stuff
        console.log('ALL DONE!');
        await driver.sleep(5000);
    } 
    catch (err) {
        const filename = `error-${Date.now()}.png`;
        await driver.takeScreenshot().then(
            data => fs.writeFileSync(filename, data, 'base64')
        );
    } 
    
    finally {
        await driver.quit();
    }
}
)();