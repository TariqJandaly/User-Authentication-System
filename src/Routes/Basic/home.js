module.exports = {
    data: {
        name: "Home page",
        description: "Home page?",
        type: "GET",
        route: "/"
    },
    execute(req, res, apps) {
        res.send(apps.public("index.html"))


    }
}