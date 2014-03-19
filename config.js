var path = require('path');
var exphbs = require('express3-handlebars');
// declare hbs template with options
var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: ".hbs"
  // handlebars: require('handlebars'),
  // helpers: {},
  // layoutsDir: 'views/layouts',
  // partialsDir: 'views/partials'
});

module.exports = function(app, express, mongoose) {
  var config = this;
  this.port = 2222;
  this.portS = 8443;
  app.requireAuth = false;

  // configure everyauth
  app.everyauth.twitter
     .consumerKey('yourKey')
     .consumerSecret('yourSecret')
     .findOrCreateUser(function(session, accessToken, accessTokenSecret, user) { return 1;}).redirectPath('/');

  app.configure(function(){
    app.set('views', path.join(__dirname, 'views'));
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs')

    // app add-ons
    app.use(express.favicon());
    app.use(express.basicAuth(function(user, pass){
      return user === 'fuck' && pass ==='gates'
    }));
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'topGun'}));
    app.use(app.everyauth.middleware());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
  });

  // development only
  app.configure('development', function(){
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.mongoose.connect('mongodb://localhost/uxioms');
  });

  // staging environment only
  app.configure('staging', function() {
    app.set('port', process.env.PORT || port);
    app.use(express.errorHandler());
    app.mongoose.connect('mongodb://localhost/uxioms');
  });

  // production only
  app.configure('production', function() {
    app.set('port', process.env.PORT || port);
    app.use(express.errorHandler());
    app.mongoose.connect('mongodb://localhost/uxioms');
  });

  return config;

}