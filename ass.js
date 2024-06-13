const puppeteer = require('puppeteer');
const links = ['https://www.jumia.com.eg/generic-stylish-women-hoodie-autumn-material-black-gray-39576757.html',
  'https://www.jumia.com.eg/maybelline-new-york-ancill-fit-me-concealer-10-light-23049843.html']


const takeScreenshot = async (link) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });
  
  await page.goto(link);
  try { //the close btn
    await page.waitForSelector('.cls[aria-label="newsletter_popup_close-cta"]', { timeout: 5000 });
    await page.click('.cls[aria-label="newsletter_popup_close-cta"]');
  } catch (err) {
    console.log('Popup not found or unable to close it, continuing without closing it.');
  }
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `screenshots/${link}.jpg`, type: 'jpeg', quality: 80 });
  
  await browser.close();
}
links.map((link) => {
  takeScreenshot(link);
})