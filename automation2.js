const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.wikipedia.org/');

        await driver.findElement(By.id('searchInput')).sendKeys('Selenium (software)');

        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.elementLocated(By.id('firstHeading')), 5000);
        await driver.findElement(By.id('firstHeading')).getText().then(function(text) {
            console.log("Page title is: " + text);
        });
        await driver.sleep(5000);
    }
    finally {
        await driver.quit();
    }
}
)();