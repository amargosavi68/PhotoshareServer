const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Photos = require('../models/photos');

const photoRouter = express.Router();

photoRouter.use(bodyParser.json());

//all methods are chained together.
photoRouter.route('/')
.get((req, res, next) =>{
     Photos.find({})
     .then(photos => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(photos);
     }, (err) => next(err))
     .catch(err => next(err));
})
.post((req, res, next) =>{
     Photos.create(req.body)
     .then(photo => {
          console.log("Photo uploaded! ", photo)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(photo);
     }, (err) => next(err))
     .catch(err => next(err));
})
.put((req, res, next) =>{
     res.statusCode = 403;
     res.end("Not Supported!");
})
.delete((req, res, next) =>{
     Photos.findByIdAndRemove(req.body)
     .then((resp) => {
          console.log("Photo Deleted having id: ", req.body)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
     }, (err) => next(err))
     .catch(err => next(err));
});


module.exports = photoRouter;