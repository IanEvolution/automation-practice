const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.linkedin.com');

        //wait for it to load
        await driver.sleep(2000);

        //inject cookies to bypass F2A NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE NOTE
        await driver.manage().addCookie({
            name: 'li_at',
            value: 'AQEDAToavrQFJ0kOAAABl1aM2ggAAAGXepleCFYAoUa1YqT7eLo_DpxrlIBQDuIrUzadsy-oIized2GfAhsZeaVQX0UrdjuMfyfG5H1ZJ-BT4PAWifC5HZP-gbSOSbB4YlMtk1AA0iri1dUThY1U7uX9',
            domain: '.linkedin.com',
            path: '/',
            secure: true,
            httpOnly: true
        });
        await driver.navigate().refresh(); // You're in!


        //click the login by email
        /*const emailInput = await driver.wait(until.elementLocated(By.css('a[href="https://www.linkedin.com/login"]')), 5000);
        await driver.wait(until.elementIsVisible(emailInput), 5000);
        await driver.wait(async () => await emailInput.isEnabled(), 5000);
        await emailInput.click(); 
        // enter email and password
        const emailField = await driver.wait(until.elementLocated(By.id('username')), 5000);
        await driver.wait(until.elementIsVisible(emailField), 5000);
        await driver.wait(async () => await emailField.isEnabled(), 5000);
        await emailField.sendKeys('ianholt839@gmail.com');
        const passwordField = await driver.wait(until.elementLocated(By.id('password')), 5000);
        await driver.wait(until.elementIsVisible(passwordField), 5000);
        await driver.wait(async () => await passwordField.isEnabled(), 5000);
        await passwordField.sendKeys('RDL645Scout!');
        // click the login button
        await driver.findElement(By.css('button[type="submit"]')).click();
        */

        // click the jobs icon
        const jobLink = await driver.wait(until.elementLocated(By.css('a[href="https://www.linkedin.com/jobs/?"]')), 10000);
        await driver.wait(until.elementIsVisible(jobLink), 10000);
        await driver.wait(until.elementIsEnabled(jobLink), 10000);
        await jobLink.click();

        //wait for the job page to load
        //const jobPage = await driver.wait(until.elementLocated(By.xpath('h2[contains(@class="t-black") and text()="Top job picks for you"]')), 10000);
        //await driver.wait(until.elementIsVisible(jobPage), 10000);

        //search for "sdet remote" jobs
        const jobSearch = await driver.wait(until.elementLocated(By.css('input[type="text"]')), 10000);
        await driver.wait(until.elementIsVisible(jobSearch), 5000);
        await driver.wait(async () => await jobSearch.isEnabled(), 5000);
        await jobSearch.sendKeys('sdet remote', Key.RETURN);

        // extract and validate jobs
        const jobResults = await driver.findElements(By.css('.scaffold-layout__list li.jobs-search-results__list-item'));
        await driver.wait(until.elementIsVisible(jobResults[0]), 10000);
        await driver.jobResults.getText();
        await driver.jobResults[i].forEach(job => {
            console.log('Job Title:', job.findElement(By.css('.job-card-list__title')).getText());
            console.log('Company:', job.findElement(By.css('.job-card-container__company-name')).getText());
            console.log('Location:', job.findElement(By.css('.job-card-container__metadata-item')).getText());
            console.log('Posted:', job.findElement(By.css('.job-card-container__metadata-item--posted')).getText());
            console.log('---');
        }
        );

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();
