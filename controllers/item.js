module.exports = {
	create: function(req, res) {
		var model = new Models.item(req.body);
		model.save(function(err, model) {
			if (err) {
				res.status(500).json(err);
				return
			}
			res.status(200).json(model);
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
	}
}