// error handling functions of various verbosity and use
module.exports = {
  logErrors: function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Another one bit the dust.');
  },

  clientErrorHandler: function(err, req, res, next) {
    if (req.xhr) {
      res.send(500, { error: 'Angry !' });
    } else {
      next(err);
    }
  },

  errorHandler: function(err, req, res, next) {
    res.status(500);
    res.render('error', { error: err });
  }
};