// impot selenium-webdriver then fill the const with classes and methods 
// all followed by the acual import of the webdriver 
// "require = ('selenium-webdriver');"
const {Builder, By, Key, until} = require('selenium-webdriver');

// "async function" allows you to use "await" inside the function
// "runAutomation" is the name of the function that we chose
(async function runAutomation() {

    // this created the the driver to run the browser, and the brower we chose is Chrome
    let driver = await new Builder().forBrowser('chrome').build();
    
    // "try" is the start of all the actions that will take place in the automation
    // starting with opening the specific URL that will be tested 
    try {
        // "await driver.get" opens the URL that is pasted in the parentheses
        await driver.get('https://the-internet.herokuapp.com/login');

        // here are actions of finding the username box then "sending" the "keys" (typing) in the username box
        await driver.findElement(By.id('username')).sendKeys('tomsmith');

        // here is the password version of the line above
        await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');

        // this finds the login button then clicks it
        await driver.findElement(By.css('button[type="submit"]')).click();

        // the element here is the "flash" element that you would see if u inspected the page
        // this site does not have a "flash" css element so this doesnt do anything"
        // the site has an element <div> with the id = flash so proper code would be: 
        // By.id('flash")
        await driver.wait(until.elementLocated(By.css('flash')), 5000);

        // this posts in the console that the login test was completed
        console.log("login test completed");

        // after all tests are done this sends it to the "complete" phase which is to close the test
    }   finally {

        // quits the driver which closes the browser
        await driver.quit();
    }

})();
