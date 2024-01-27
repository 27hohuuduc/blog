const fs = require("fs")

const content = 
`
{
    "scripts": {
        "start": "node StartUp.js"
    },
    "dependencies": {
        "cors": "^2.8.5",
            "express": "^4.18.2",
                "mongodb": "^6.3.0"
    },
    "engines": {
        "node": ">=14"
    }
}
`


fs.writeFile("./dist/package.json", content, () => {
    console.info("Build done!")
})