//requiring dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//use express
const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

//set route for posts
const posts = require('./routes/api/posts');

//use the route
app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
	// Static folder
	app.use(express.static(__dirname + '/public/'));

	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

//setting port - heroku || local
const port = process.env.PORT || 5000;

//make app listen for command to start
app.listen(port, () => console.log(`Server started on port ${port}`));
