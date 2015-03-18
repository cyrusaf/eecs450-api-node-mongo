var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	name: String,
	id: String,
	img: String,
	exts: [String]
}, {
	versionKey: false
});

module.exports = connection.model('item', itemSchema);