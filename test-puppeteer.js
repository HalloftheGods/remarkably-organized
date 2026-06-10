import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:5173/planner');
  
  // Wait for the page to load
  await new Promise(r => setTimeout(r, 2000));
  
  // Click on the design panel or change a setting to trigger the update
  // First, find a setting. Let's change the theme.
  await page.evaluate(() => {
    // Assuming we can access the settings globally or we just click a button
    // The design panel has inputs. We can click a preset or just click something.
    // Let's just try to find a button with "A4" or something
  });
  
  await new Promise(r => setTimeout(r, 2000));

  console.log('Current URL:', page.url());
  
  await browser.close();
})();
