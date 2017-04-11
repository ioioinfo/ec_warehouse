var _ = require('lodash');
var EventProxy = require('eventproxy');
const uuidV1 = require('uuid/v1');

var pick_up_main = function(server) {
	return {
		//保存捡炼表信息
		save_pick_main :function(order_id, location,state,point_id,weights, cb) {
			var id = uuidV1();
			var query = `insert into pick_up_main(id, order_id, location, state,
				point_id, weights, created_at, updated_at, flag)
				values
				(?,?,?,?,
				?,?,now(),now(),0)` ;
			var columns=[id, order_id, location, state, point_id, weights];
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

module.exports = pick_up_main;
