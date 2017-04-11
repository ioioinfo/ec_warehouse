// Base routes for item..
const uu_request = require('../utils/uu_request');
var eventproxy = require('eventproxy');
const uuidV1 = require('uuid/v1');
var service_info = "ec_warehouse service";
var org_code = "ioio";
var platform_code = "ec_mobile";

var do_get_method = function(url,cb){
	uu_request.get(url, function(err, response, body){
		if (!err && response.statusCode === 200) {
			var content = JSON.parse(body);
			do_result(false, content, cb);
		} else {
			cb(true, null);
		}
	});
};
//所有post调用接口方法
var do_post_method = function(url,data,cb){
	uu_request.request(url, data, function(err, response, body) {
		console.log(body);
		if (!err && response.statusCode === 200) {
			do_result(false, body, cb);
		} else {
			cb(true,null);
		}
	});
};
//处理结果
var do_result = function(err,result,cb){
	if (!err) {
		if (result.success) {
			cb(false,result);
		}else {
			cb(true,result);
		}
	}else {
		cb(true,null);
	}
};

exports.register = function(server, options, next){
	server.route([
		//创建捡炼主表单，辅单
		{
			method: 'POST',
			path: '/save_pick_infos',
			handler: function(request, reply){
				var order = request.payload.order;
				order = JSON.parse(order);
				var order_id = order.order_id;
				

				server.plugins['models'].pick_up_main.save_pick_main(order_id, location,state,point_id,weights,function(err,row){
					if (row.affectedRows>0) {
						return reply({"success":true,"message":"ok","service_info":service_info});
					}else {
						return reply({"success":false,"message":row.message,"service_info":service_info});
					}
				});
			}
		},

    ]);

    next();
};

exports.register.attributes = {
    name: 'warehouse_controller'
};
