const express = require('express');
const app = express();

app.get("/api", (req, res) => {
 res.json({ message: "Hello from server!" });

});



app.listen(3001, () => {
 console.log('Serveur en cours d\'exécution sur le port 3001');
});

//app.listen(3001);

