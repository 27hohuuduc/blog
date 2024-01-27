const fs = require('fs')
console.log(fs.readdirSync("/etc"))
console.log(fs.readdirSync("/etc/secrets"))
console.log(fs.readFileSync("/etc/secrets/config.json", "utf8"))
