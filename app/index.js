const puppeteer = require("puppeteer");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function getData() {
  let URL = "https://www.speedtest.net/run";
  //   let URL = "https://www.speedtest.net/result/10090601670";
  let browser = await puppeteer
    .launch({
      headless: false,
      defaultViewport: null,
    })
    .catch();
  let page = await browser.newPage().catch();
  await page.goto(URL).catch();

  await sleep(60000);
  console.log("test done");
  const data = await page
    .evaluate(() => {
      var t2 = [];
      var temp = document.querySelectorAll(".result-data-large");
      for (i = 0; i < temp.length; i++) {
        t2.push(temp[i].textContent);
      }

      return t2;
    })
    .catch();
  browser.close();
  var today = new Date();
  return {
    ping: data[0],
    download: data[1],
    upload: data[2],
    date:
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate(),
    time:
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
  };
  //   console.log(data[0]);
}


async function WriteCsv() {
  const xlsx = require("xlsx");
  var fs = require("fs");
  var wb = xlsx.readFile("Internet.xlsx");
  var ws = wb.Sheets["Sheet1"];
  var data = xlsx.utils.sheet_to_csv(ws);
  fs.writeFile(__dirname + "Internet.csv", data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("test.csv was saved in the current directory!");
  });
}

async function WriteData() {
  console.log("Testing...");
  var got = await getData();
  console.log(got);
  // var got ={ Ping: 1, Download: 3, Upload: 4 };
  const xlsx = require("xlsx");
  var wb = xlsx.readFile("Internet.xlsx");
  var ws = wb.Sheets["Sheet1"];
  var data = xlsx.utils.sheet_to_json(ws);
  data.push(got);

  var newWb = xlsx.utils.book_new();
  var newWs = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(newWb, newWs, "Sheet1");
  xlsx.writeFile(newWb, "Internet.xlsx");
  console.log("Writing CSV...");
  await WriteCsv();
  console.log("Chart Updating...");
  await sleep(100);
  chartDisplay();
  await sleep(60000);
  WriteData();
}
