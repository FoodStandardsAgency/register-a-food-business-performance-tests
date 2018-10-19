const fs = require('fs');
const js2xmlparser = require("js2xmlparser");

let result = require('./report.json');
let jsonstr = JSON.stringify(result);
let xml = js2xmlparser.parse("ArtilleryReport",jsonstr.replace(/\[/gi, '')).replace(/\]/gi, '');

fs.writeFile('./report.xml', xml, function (err) {
    if (err) console.log(err);
    console.log("successfully written xml to file");
})



