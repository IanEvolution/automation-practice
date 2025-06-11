const {Builder, By, Key, until} = require('selenium-webdriver');

(async function runAutomation() {
    let d = await new Builder().forBrowser('chrome').build();
    try {
        await d.get('https://books.toscrape.com');

        // Navigate to the mystery category
        const mysteryCata = await d.wait(until.elementLocated(By.css('a[href="catalogue/category/books/mystery_3/index.html"]')), 5000);
        await mysteryCata.click();

        // Function to extract book data from the current page
        async function extractBooks(driver) {
            await driver.wait(until.elementsLocated(By.css('article.product_pod')), 5000);
            const books = await driver.findElements(By.css('article.product_pod'));
            const results = [];
            for (let book of books) {
                const title = await book.findElement(By.css('h3 a')).getAttribute('title');
                const price = await book.findElement(By.css('p.price_color')).getText();
                const ratingClass = await book.findElement(By.css('p.star-rating')).getAttribute('class');
                const rating = ratingClass.split(' ')[1];
                results.push({title, price, rating});
            }
            return results;
        }

        // Scrape page 1
        const booksPage1 = await extractBooks(d);

        // Go to page 2 and scrape
        await d.findElement(By.css('a[href="page-2.html"]')).click();
        const booksPage2 = await extractBooks(d);

        // Combine and print
        const allBooks = [...booksPage1, ...booksPage2];
        console.log(`Number of Books: ${allBooks.length}`);
        for (const book of allBooks) {
            console.log(`Book: ${book.title}`);
            console.log(`Price: ${book.price}`);
            console.log(`Rating: ${book.rating}`);
            console.log('----------------');
        }

        console.log('automation successful');
    } finally {
        await d.quit();
    }
})();