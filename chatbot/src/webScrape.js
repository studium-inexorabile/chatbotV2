const puppeteer = require("puppeteer");
const chalk = require("chalk");
let fs = require("fs");

// MY OCD of colorful console.logs for debugging... IT HELPS
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    // open the headless browser
    let browser = await puppeteer.launch({ headless: false });
	// open a new page
	let links = [
		`https://banyanlabs.io/about_us`,
		`https://banyanlabs.io/`,
		`https://banyanlabs.io/services/our_process`

	]
	let page = await browser.newPage();
	let combinedText = []
    // enter url in page
	for(let i in links){
		await page.goto(links[i]);
		await page.waitForSelector("p" || "div");
		
		let content = await page.evaluate(() => {
		  let text = document.querySelectorAll(`p`);
		  let textArray = '';
		  for (let i = 0; i < text.length; i++) {
			textArray += text[i].innerText.trim()
		  }
		  return textArray;
		});
		combinedText += content
	}
    // console.log(news);
    await browser.close();
    // Writing the news inside a json file
    fs.writeFile("text.json", JSON.stringify(combinedText), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(success("Browser Closed"));
  } catch (err) {
    // Catch and display errors
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();