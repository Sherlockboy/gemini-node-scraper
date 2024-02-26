require("dotenv").config();

const scraper = require("./src/scraper");
const ai = require("./src/ai");

async function run() {
  const html = await scraper.getHtmlContent(
    "https://en.ipakyulibank.uz/physical/exchange-rates/courses",
    "#__layout .application--wrap table",
    true
  );

  const prompt = `Parse exchange rates from the html below and return response as valid JSON: "${html}"`;
  console.log(prompt);

  const response = await ai.generateContent(prompt);
  console.log(response);
}

run();
