var _ = require('lodash');
var EventProxy = require('eventproxy');

var pick_up_details = function(server) {
	return {
		//保存捡炼表明细
		save_pick_main :function(main_id, product_id, number, location, product_name, sku_id, barcode, weights, cb) {
			var query = `insert into pick_up_details(id, main_id, product_id,
				number, location, product_name, sku_id, barcode, weights,
				created_at, updated_at, flag)
				values
				(uuid(),?,?,
				?,?,?,?,?,?,
				now(),now(),0)` ;
			var columns=[main_id, product_id, number, location, product_name, sku_id, barcode, weights];
			server.plugins['mysql'].pool.getConnection(function(err, connection) {
				connection.query(query, columns, function(err, results) {
					connection.release();
					if (err) {
						console.log(err);
						cb(true,results);
						return;
					}
					results.main_id = id;
					cb(false,results);
				});
			});
		},

	};
};

module.exports = pick_up_details;
