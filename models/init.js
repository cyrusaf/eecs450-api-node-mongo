var mongoose = require('mongoose');
GLOBAL.connection = mongoose.connect('mongodb://localhost/item');

module.exports = {
	item: require('./item.js'),
}