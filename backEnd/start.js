const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3001;

require('./models/db');

app.use(cors())
app.use(bodyParser.json());

//fonction de test pour vérifier que le serveur fonctionne
app.get("/api", (req, res) => {
    res.json({message: "Hello from server!"});
});

app.use(require('./routes/routesProd'));
app.use(require('./routes/routesCommande'));
app.use(require('./routes/routesUtilisateur'));

// simple middleware to catch all non routed pages as 404 and forward to the error middleware
app.use((req, _res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    error.message = 'The page ' + req.hostname + req.originalUrl + ' could not be found on this website.';
    next(error);
});

/*** Error middlewares ***/

if (app.get('env') === 'development') {
    // Development error middleware
    // will print the stacktrace while in development mode
    app.use((error, _req, res, _next) => {
        if (!error) {
            error = new Error('Unknown error');
            error.status = 500;
        } else {
            error.status = 400;
        }
        res.status(error.status);
        res.render('error', {
            title: 'Error ' + error.status,
            message: error.message,
            stacktrace: error.stack
        });
    });
} else {
    // Production error middleware
    // no stacktraces leaked to user
    app.use((error, _req, res, _next) => {
        if (!error) {
            error = new Error('Unknown error');
            error.status = 500;
        } else {
            error.status = 400;
        }
        res.status(error.status);
        res.render('error', {
            title: 'Error ' + error.status,
            message: error.message,
            stacktrace: null
        });
    });
}

app.listen(port, () => {
    console.log('Serveur en cours d\'exécution sur le port ' + port);
});

