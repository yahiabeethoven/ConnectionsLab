//initialize express app
let express = require('express');
let app = express();
app.use("/", express.static("public"));

// create http server
let http = require('http');
let server = http.createServer(app);
server.listen(5000, () => {
    console.log('listening on port 5000');
})