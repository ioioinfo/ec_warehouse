var _ = require('lodash');
var EventProxy = require('eventproxy');

var warehouse_locations = function(server) {
	return {
		//根据sku_id找到商品库位
		get_order : function(sku_id, point_id, cb){
			var query = `select area_id, shelve_id, row_id, column_id
				from warehouse_locations
				where flag =0 and sku_id = ? and point_id = ?
			`;
			server.plugins['mysql'].pool.getConnection(function(err, connection) {
				connection.query(query,[sku_id, point_id], function(err, results) {
					connection.release();
					if (err) {
						console.log(err);
						cb(true,null);
						return;
					}
					cb(false,results);
				});
			});
		},

	};
};

module.exports = warehouse_locations;
