const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Photos = require('../models/photos');
const cors = require('./cors');

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

//all methods are chained together.
uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) =>{
     res.statusCode = 403;
     res.send("GET Operation not supported!");
})
.post(cors.corsWithOptions, (req, res, next) =>{
     Photos.create(req.body)
     .then(photo => {
          console.log("Photo uploaded! ", photo)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(photo);
     }, (err) => next(err))
     .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res, next) =>{
     res.statusCode = 403;
     res.end("Not Supported!");
})
.delete(cors.corsWithOptions, (req, res, next) =>{
     res.statusCode = 403;
     res.send("DELETE Operation not supported!");
});


module.exports = uploadRouter;