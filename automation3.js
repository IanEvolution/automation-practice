const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://www.wikipedia.org/');

        // wait for the page to load then clicks the spanish link
        const spanishLink = await driver.wait(until.elementLocated(By.id('js-link-box-es')),5000)
        await driver.wait(until.elementIsVisible(spanishLink), 5000);
        await driver.wait(async () => spanishLink.isEnabled(),5000);
        await spanishLink.click();

        //waits for page tp load then clicks the search button
        const searchButton = await driver.wait(until.elementLocated(By.css('input[type="search"]')), 5000);
        await driver.wait(until.elementIsVisible(searchButton), 5000);
        await driver.wait(async () => searchButton.isEnabled(), 5000);
        await searchButton.sendKeys('Automatización', Key.RETURN);     
        
        // wait for header to load and get the text
        const header = await driver.wait(until.elementLocated(By.id('firstHeading')), 5000);
        await driver.wait(until.elementIsVisible(header), 5000);
        await header.getText().then(function(text) {
            console.log("Page title is: " + text);
        }
        );
    }
    finally {
        await driver.quit();
    }
}
)();