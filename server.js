console.clear()
const express    = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const app = express()
const config = require("./config.json")

app.use(bodyParser.json())

let apps_files = fs.readdirSync("src/Apps")
let apps = {}

for(let app of apps_files) {
    app = require(`./src/Apps/${app}`)
    apps[app.data.command] = app.execute
}

let Routes = fs.readdirSync("src/Routes")

for(let route of Routes) {
    let Files = fs.readdirSync(`src/Routes/${route}`)

    for(let file of Files) {
        file = require(`./src/Routes/${route}/${file}`)

        if(file.data.type == "GET") {
            app.get(file.data.route, (req, res) => {
                file.execute(req, res, apps)
            })
        }

        if(file.data.type == "POST") {
            app.post(file.data.route, (req, res) => {
                file.execute(req, res, apps)
            })
        }
    }
}

app.listen(config.PORT, () => {
    console.log(`Server is listening on the port: ${config.PORT}`)
})