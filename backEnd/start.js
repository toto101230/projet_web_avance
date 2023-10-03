const express = require('express');
const app = express();
app.get('/', function(req, res){
 res.send("Hello world!");
});

app.get("/api", (req, res) => {
 res.json({ message: "Hello from server!" });
});


app.listen(3001);

