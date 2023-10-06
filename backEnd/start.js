// load DB connection
require('./models/db');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// instruct express to use our routes middleware

app.use(cors())
app.use(bodyParser.json());


app.get("/api", (req, res) => {
    res.json({message: "Hello from server!"});
});



app.use(require('./routes/routesProd'));
app.use(require('./routes/routesCommande'));
app.use(require('./routes/routesUtilisateur'));


app.listen(3001, () => {
    console.log('Serveur en cours d\'exécution sur le port 3001');
});

//app.listen(3001);

