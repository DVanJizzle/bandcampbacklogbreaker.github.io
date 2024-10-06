
async function ScrapeAlbums(url) {
  alert("test");
  const { Builder, By, Key, until } = require('selenium-webdriver');

  let driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get(url);

      await driver.wait(until.elementsLocated(By.css('button.show-more')), 10000);

      if (buttons.length >= 2) {
        await buttons[1].click;
        console.log("button clicked");
      }
    }
    catch {

    }

};
