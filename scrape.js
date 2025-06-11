const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://books.toscrape.com/catalogue/category/books/travel_2/index.html');

        await driver.wait(until.elementsLocated(By.css('article.product_pod')), 5000);
        const books = await driver.findElements(By.css('article.product_pod'));

        console.log(`Number of books: ${books.length}`);

        for (let i =0; i < Math.min(4, books.length); i++) {
            const book = books[i]

            const title = await book.findElement(By.css('h3 a')).getAttribute('title');
            const price = await book.findElement(By.css('p.price_color')).getText();

            console.log(`Book ${i + 1}: ${title}: ${price}`);
        }

        const firstBook = await driver.findElement(By.css('a[href="../../../its-only-the-himalayas_981/index.html"]'));
        await firstBook.click();

        await driver.sleep(500);

        await driver.wait(until.elementLocated(By.css('p')), 5000);
        const starRating = await driver.findElement(By.css('p.star-rating')).getAttribute('class');
        const rating = starRating.split(' ')[1];
        const productDescription = await driver.findElement(By.css('#product_description + p')).getText();

        console.log(`STAR RATING: ${rating}`);
        console.log(`PRODUCT DESCRIPTION: ${productDescription}`);
    }
    finally {
        await driver.close();
    }
})();