module.exports = {
	create: function(req, res) {
		var form = new multiparty.Form();

		form.parse(req, function(err, fields, files) { 
			var itemObj  = {};
			itemObj.name = fields.name[0];
			itemObj.id   = fields.id[0];
			itemObj.img  = '/img/' + fields.id[0] + '.png';
			itemObj.exts = [];

			// Populate exts
			if (fields.ext) {
				for (var i = 0; i < fields.ext.length; i++) {
					var exts = fields.ext[i].split(',');
					for (var j = 0; j < exts.length; j++) {
						itemObj.exts.push(exts[j]);
					}
				}
			}

			// Move file from tmp to imgs
			var source = fs.createReadStream(files.img[0].path);
			var dest = fs.createWriteStream(__dirname + '/../img/'+fields.id[0] + '.png');

			source.pipe(dest);
			source.on('end', function() {
				console.log('File copied!');
				// Save item in DB
				var model = new Models.item(itemObj);
				model.save(function(err, model) {});
			});
			source.on('error', function(err) {
				console.log('Error copying file!');
			});
			res.redirect(fields.url);
		});
	},
	read: function(req, res) {
		Models.item.find({}, function(err, models) {
			if (err) {
				res.status(500).json(err);
				return
			}
			res.status(200).json(models);
		}); 
	},
	update: function(req, res) {
		Models.item.update({_id: req.body._id}, req.body, function(err, model) {
			if (err) {
				res.status(500).json(err);
				return
			}
			console.log("updated");
			res.status(200).json(model);
		});
	},
	delete: function(req, res) {
		Models.item.remove({_id: req.body._id}, function(err) {
			if (err) {
				res.status(500).json(err);
				return
			}
			res.status(200).json("item deleted");
		});
		fs.unlinkSync(__dirname + '/../img/' + req.body.id + '.png');
	}
}