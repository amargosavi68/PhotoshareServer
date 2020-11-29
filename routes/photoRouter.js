const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Photos = require('../models/photos');
const cors = require('./cors');

const photoRouter = express.Router();

photoRouter.use(bodyParser.json());

//all methods are chained together.
photoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) =>{
     Photos.find({})
     .then(photos => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(photos);
     }, (err) => next(err))
     .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res, next) =>{
     res.statusCode = 403;
     res.send("POST operation not supported!");
})
.put(cors.corsWithOptions, (req, res, next) =>{
     res.statusCode = 403;
     res.end("Not Supported!");
});

photoRouter.route('/:photoId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.delete(cors.corsWithOptions, (req, res, next) =>{
     console.log(req.params.photoId);
     Photos.findByIdAndDelete(req.params.photoId)
     .then((resp) => {
          console.log("Photo Deleted having id: ", req.params.photoId)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(resp);
     }, (err) => next(err))
     .catch(err => next(err));
});

module.exports = photoRouter;