let express = require("express");
let app = express();

app.get("/", (req, res) => {
    res.send("Hello");
})

app.listen(3000, () => {
    console.log("app is running");
})