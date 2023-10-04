const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/appli', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});