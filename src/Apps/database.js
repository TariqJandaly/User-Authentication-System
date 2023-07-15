const fs = require("fs")

module.exports = {
    data: {
        name: "Databse",
        description: "Allow the user to create or accses a database.",
        command: "database"
    },
    execute: class {
        constructor({ name, file }) {
            this.DatabaseConfig = fs.existsSync("src/Databases/config.json")

            if(this.DatabaseConfig) {
                this.DatabaseConfig = JSON.parse(fs.readFileSync("src/Databases/config.json", "utf-8"))
            } else {
                fs.writeFileSync("src/Databases/config.json", "{}")
                this.DatabaseConfig = JSON.parse(fs.readFileSync("src/Databases/config.json", "utf-8"))
            }

            this.fileName = file

            this.file = name in this.DatabaseConfig

            if(this.file) {
                this.file = JSON.parse(fs.readFileSync(`src/Databases/${this.DatabaseConfig[name]}`, "utf-8"))
            } else {
                this.file = file ? file : `${name}.json`

                fs.writeFileSync(`src/Databases/${this.file}`, "{}")
                this.DatabaseConfig[name] = this.file
                fs.writeFileSync("src/Databases/config.json", JSON.stringify(this.DatabaseConfig, null, 4))
                this.file = JSON.parse(fs.readFileSync(`src/Databases/${this.DatabaseConfig[name]}`, "utf-8"))
            }
            
        }

        getAll() {
            return this.file
        }

        get(element) {
            return this.file[element]
        }

        set(element, data) {
            this.file[element] = data
            return this.UpdateDatabase()
        }

        remove(element) {
            if(element in this.file) {
                delete this.file[element]
                return this.UpdateDatabase()
            } else return this.UpdateDatabase()
        }

        UpdateDatabase() {
            fs.writeFileSync(`src/Databases/${this.fileName}`, JSON.stringify(this.file, null, 4))

            return this.file
        }
        
    }
}