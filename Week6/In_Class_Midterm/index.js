let express = require("express");
let app = express();
const PORT = 3000;

let midterms = {
   "hard": {
        "name": "Why is it so hard to do good?",
        "date": "28-Oct-22"
   },
   "cn": {
        "name": "Computer Networks",
        "date": "12-Oct-22"   
   },
   "cl": {
        "name": "Connections Lab",
        "date": "6-Oct-22"   
    }
}

app.use("/", express.static("public"));

// app.get('/', (req, res) => {
//     res.send("Home Page");
// })

app.get("/midterms", (req, res) => {
    let courseName = req.query.course;
    if (midterms[courseName]) {
        res.json(midterms[courseName]);
    }
    else {
        res.json({"name": "data does not exist"});
    }
    
})
app.get("/midterm/:course", (req, res) => {
    let courseName = req.params.course;
    console.log(courseName);
    res.json(midterms[courseName]);
})

app.listen(PORT, () => {
    console.log("Server is running on port: "+PORT);    
})

