// Base routes for default index/root path, about page, 404 error pages, and others..
exports.register = function(server, options, next){

	server.expose('pick_up_details', require('./pick_up_details.js')(server));
	server.expose('warehouse_locations', require('./warehouse_locations.js')(server));
	server.expose('pick_up_main', require('./pick_up_main.js')(server));
	next();
}

exports.register.attributes = {
    name: 'models'
};
