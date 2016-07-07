// app/models/mosque-prayer-time.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MosqueTimeSchema   = new Schema({
    name: String,
    Fajr:   String,
  	Dhuhr:  String,
  	Asr:    String,
  	Maghrib:String,
  	Isha:   String,
  	Jummah: String

});

module.exports = mongoose.model('MosqueTime', MosqueTimeSchema);