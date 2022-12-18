let express = require("express");
let app = express();

app.use('/', express.static('public'))

app.listen(3000, () => {
  console.log("app is runnning");
})

app.post('message', (req, res) => {
    console.log(req);
    console.log(res.body);
    res.send({"task": "successful"}); 
})