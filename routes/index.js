exports.index = function(req, res){
	res.render('home', {
		showTitle: true
	});
};