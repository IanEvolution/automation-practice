const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {

        // open the site
        await driver.get('https://demoqa.com/text-box');

        // fill out the form with any values
        const fullName = await driver.wait(until.elementLocated(By.id('userName')), 5000);
        await driver.wait(until.elementIsVisible(fullName), 5000);
        await driver.wait(async () => await fullName.isEnabled(), 5000);

        const email = await driver.findElement(By.id('userEmail'));
        const currentAddress = await driver.findElement(By.id('currentAddress'));
        const permanentAddress = await driver.findElement(By.id('permanentAddress'));
        
        await fullName.sendKeys('John Doe');
        await email.sendKeys('WrongEmail@gmail.com');
        await currentAddress.sendKeys('Wrong Current Address');
        await permanentAddress.sendKeys('Wrong Permanent Address');

        // click submit
        await driver.findElement(By.id('submit')).click();

        // wait for the output to appear
        await driver.sleep(5000);

        // now clear all the fields 
        await fullName.clear();
        await email.clear();
        await currentAddress.clear();
        await permanentAddress.clear();

        // enter new values
        await fullName.sendKeys('Ian Holt');
        await email.sendKeys('CorrectEmail@gmail.com');
        await currentAddress.sendKeys('Correct Current Address');
        await permanentAddress.sendKeys('Correct Permanent Address');

        // click submit
        await driver.findElement(By.id('submit')).click();

        // print the output to the console and look at the results
        const output = await driver.wait(until.elementLocated(By.id('output')), 5000);
        console.log(await output.getText());
        console.log("ALL DONE!");
        await driver.sleep(5000);
    }
    finally {
        await driver.quit();
    }
}
)();