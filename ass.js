const puppeteer = require('puppeteer');
const links = ['https://www.jumia.com.eg/generic-stylish-women-hoodie-autumn-material-black-gray-39576757.html',
'https://www.jumia.com.eg/maybelline-new-york-ancill-fit-me-concealer-10-light-23049843.htmlس']
const takeScreenshot = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport size
  await page.setViewport({ width: 1280, height: 800 });
  
  // Navigate to the desired URL
  await page.goto(link);
  try {
    await page.waitForSelector('.popup-close-button', { timeout: 5000 });
    await page.click('.popup-close-button');
  } catch (err) {
    console.log('Popup not found, continuing without closing it.');
  }
  // Take a full-page screenshot in JPEG format with quality 80
  await page.screenshot({ path: `screenshots/${link}.jpg`, type: 'jpeg', fullPage: true, quality: 80 });
  
  await browser.close();
}
links.map((link) => {
  takeScreenshot(link);
})