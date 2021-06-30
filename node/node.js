const fs = require("fs");
const folderName = process.argv[2] || "Project";

fs.mkdirSync(folderName);

fs.writeFileSync(`${folderName}/index.html`);
fs.writeFileSync(`${folderName}/style.css`);
fs.writeFileSync(`${folderName}/script.js`);
