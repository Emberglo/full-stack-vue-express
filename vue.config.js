//require node path
const path = require('path');

//export - like adding proxy in package.json in react
module.exports = {
	outputDir : path.resolve(__dirname, '../server/public'),
	devServer : {
		proxy : {
			'/api' : {
				target : 'http://localhost:5000'
			}
		}
	}
};
