require("dotenv").config();
const express = require("express");
const app = express();
const scraper = require("./src/scraper");
const ai = require("./src/ai");

async function run() {
  const html = await scraper.getHtmlContent(
    "https://en.ipakyulibank.uz/physical/exchange-rates/courses",
    "#__layout .application--wrap table",
    true
  );

  const prompt = `Parse exchange rates from the html below and return result as JSON objects: "${html}"`;

  return await ai.generateContent(prompt);
}

app.get("/", async (req, res) => {
  const rawData = await run();
  console.log("RAW_DATA: " + rawData)
  const jsonData = rawData.replace(/```json|```$/gi, '');
  console.log("JSON_DATA: " + jsonData)

  res.json({data: JSON.parse(jsonData)});
});

app.listen(process.env.APP_PORT, () => {
  console.log(`app listening on port ${process.env.APP_PORT}`);
});
