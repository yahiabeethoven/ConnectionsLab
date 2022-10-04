let express = require("express");
let app = express();

app.get("/", (req, res) => {
    res.send("Hello from my own server!");
    let obj = {
        "apples" : 10
    };
    res.json(obj);
})

app.listen(3000, () => {
    console.log("app is running");
})