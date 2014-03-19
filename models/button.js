module.exports = function(mongoose) {
  var collection = 'buttons';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var Button = new Schema({
    corners : {type: String, required: false},
    color   : {type: String, required: false},
    style   : {type: String, required: false},
    font    : {type: String, required: false},
    size    : {type: String, required: false},
    text    : {type: String, required: true},
    bg      : {type: String, required: false}
  });

  this.model = mongoose.model(collection, Button);

  return this;
};