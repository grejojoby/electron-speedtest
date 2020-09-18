const xlsx = require("xlsx");
var wb = xlsx.readFile("Internet.xlsx");
var ws = wb.Sheets["Sheet1"];
var data = xlsx.utils.sheet_to_json(ws);
//console.log(data);
firstLine = [];
for (i = 0; i < data.length; i++) {
  firstLine.push({ x: data[i].Download, y: data[i].Download });
}
console.log(firstLine);

//  { x: 10, y: 21 },
