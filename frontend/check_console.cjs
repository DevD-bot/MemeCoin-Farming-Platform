const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Store logs
    page.on('console', msg => {
      console.log(`[Browser Console ${msg.type().toUpperCase()}] ${msg.text()}`);
    });
    
    // Catchpage errors (uncaught exceptions)
    page.on('pageerror', err => {
      console.log(`[Browser PageError] ${err.message}`);
    });
    
    // Request failures
    page.on('requestfailed', request => {
      console.log(`[Browser RequestFailed] ${request.url()} - ${request.failure().errorText}`);
    });

    console.log("Navigating to http://localhost:5173...");
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
    
    console.log("Navigation complete. Waiting for 3 seconds to catch any delayed errors...");
    await new Promise(r => setTimeout(r, 3000));
    
    await browser.close();
    console.log("Done.");
  } catch (err) {
    console.error("Puppeteer Error:", err);
  }
})();
