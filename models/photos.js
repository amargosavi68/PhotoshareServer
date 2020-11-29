const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
     author: {
          type: String,
          required: true
     },
     location: {
          type: String,
          default: ''
     },
     image: {
          type: String,
          required: true
     },
     title: {
          type: String,
          required: true
     },
     category: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     }
},{
     timestamps: true
});

var  Photos = mongoose.model('Photo', photoSchema);

module.exports = Photos;