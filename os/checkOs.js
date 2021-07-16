const osInfo = require("./osInfo");

for(let key in osInfo) {
    console.log(`Function: ${key}\n`);
    console.log(osInfo[key]());
    console.log("\n\n")
}