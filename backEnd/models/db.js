const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017', {
	useNewUrlParser: true,
	serverSelectionTimeoutMS: 2000 // if the server is unavailable after 2 seconds, timeout
}).then().catch((error) => {
	console.error(error);
	process.exit(1);
});