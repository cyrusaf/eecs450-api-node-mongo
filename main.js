/* ROUTER.JS
 *
 * === Description ===
 * The main application for the API. It's running nodejs: 
 * the router is expressjs, mongoose is the ORM.
 *
 * === Instructions ===
 * Use the command `node main.js` to start the server.
 */

// Router config
// ==========
var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var cors          = require('cors');
GLOBAL.multiparty = require('multiparty');
GLOBAL.fs         = require('fs'); 

// For parsing post data
app.use(bodyParser());

// For allowing cross-domain access
app.use(cors());

// Create public dir
app.use('/img', express.static(__dirname + '/img'));

// Global API requires (MVC + Services)
// ==========
GLOBAL.Controllers = require('./controllers/init');
GLOBAL.Models      = require('./models/init');

// Routes
// ==========

app.post('/items', function(req, res) {
	Controllers.item.create(req, res);
});

app.get('/items', function(req, res) {
	Controllers.item.read(req, res);
});

app.post('/items/delete', function(req, res) {
	Controllers.item.delete(req, res);
})

app.get('/imgs', function(req, res) {
	Models.item.find({}, function(err, models) {
			if (err) {
				res.status(500).json(err);
				return
			}
			var imgs = models.map(function(item) {
				return item.img
			});
			res.status(200).json(imgs);
		}); 
});

app.put("/items", function(req, res) {
	Controllers.item.update(req, res);
});

// Server
// ==========
var server = app.listen(3001, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('API listening at https://' + host + ':' + port);
});