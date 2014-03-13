// required modules
var express = require('express'),
		routes = require('./routes'),
		http = require('http'),
		https = require('https'),
		path = require('path'),
		myth = require('myth'),
		fs = require('fs'),
		exphbs = require('express3-handlebars'),
		privateKey = fs.readFileSync('ssl/server.key', 'utf8'),
		certificate = fs.readFileSync('ssl/server.crt', 'utf8'),
		credentials = {key: privateKey, cert: certificate},
		port,
		app = express();
		hbs = exphbs.create({
			defaultLayout: 'main',
			extname: ".hbs",
			// handlebars: require('handlebars'),
			helpers: {

			},
			layoutsDir: 'views/layouts',
			partialsDir: 'views/partials'
		});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  port = 2222;
  portS = 8443;
}

// production only
if ('production' == app.get('env')) {
	port = 80;
	portS = 443;
}

// app settings
app.set('port', process.env.PORT || port);
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
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'public')));

function logErrors(err, req, res, next){
	console.error(err.stack);
	res.send(500, 'Something done got busted.');
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.get('/', routes.index);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port);
httpsServer.listen(portS);