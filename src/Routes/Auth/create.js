const uuid = require("uuid")

module.exports = {
    data: {
        name: "Create User",
        description: "Create a new user",
        type: "GET",
        route: "/auth/user/create"
    },
    execute(req, res, apps) {
        let users = new apps.database({ name: "Users", file: "users.json" })
        let body  = req.query
        let data = {}
        let canCreateUser = true
        let resulte = ""

        let id = uuid.v4()

        data["username"] = body.username
        data["email"]    = body.email
        data["password"] = body.password

        for(let user in users.getAll()) {
            user = users.get(user)
            
            if(user.email == data.email) {
                canCreateUser = false
                resulte = "There is a user with the given email"
                break        
            }

            if(user.username == data.username) {
                canCreateUser = false
                resulte = "There is a user with the given username"
                break
            }

        }
        

        if(canCreateUser) {
            users.set(id, data)
            resulte = "User Created!"
        }

        res.send(resulte)
        console.log(resulte)

    }
}