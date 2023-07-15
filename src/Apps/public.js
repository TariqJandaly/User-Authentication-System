const fs = require("fs")

module.exports = {
    data: {
        name: "Public",
        description: "Accses the public files",
        command: "public"
    },
    execute(file) {
        return fs.readFileSync(`Public/${file}`, "utf-8")
    }
}