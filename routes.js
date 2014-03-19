module.exports = function(app, models) {
  app.get('/', function(req, res){
    if (app.requireAuth === true && req.loggedIn === false) {
      res.redirect('/auth/twitter');
    }
    // get all the buttons
    models.buttons.find({}, function(err, docs) {
      //render the index page
      res.render('home', {
        locals: {
          title: 'UXioms Home',
          buttons: docs,
          showTitle: true
        }
      });
    });
  });
};