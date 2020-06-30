//require dependencies
const express = require('express');
const mongodb = require('mongodb');

//create router
const router = express.Router();

//Get Post - just putting / references const posts in index.js
router.get('/', async (req, res) => {
	const posts = await loadPostsCollection();
	res.send(await posts.find({}).toArray());
});

//Update Post

//Add Post
router.post('/', async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.insertOne({
		text      : req.body.text,
		createdAt : new Date()
	});
	res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
	const posts = await loadPostsCollection();
	await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
	res.status(200).send();
});

//connect to mongo database
async function loadPostsCollection() {
	const client = await mongodb.MongoClient.connect(
		'mongodb+srv://ryan:adelaide@cluster0-gbe0j.mongodb.net/vue_express?retryWrites=true&w=majority',
		{
			useNewUrlParser : true
		}
	);

	return client.db('vue_express').collection('posts');
}

//export router
module.exports = router;
