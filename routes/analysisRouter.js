const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Photos = require('../models/photos');
const cors = require('./cors');

const analysisRouter = express.Router();

analysisRouter.use(bodyParser.json());

analysisRouter.route('/:category')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) =>{
     Photos.find({category: req.params.category})
     .then(photos => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(photos);
     }, (err) => next(err))
     .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res, next) =>{
     res.statusCode = 403;
     res.end("Not Supported!");
})
.post(cors.corsWithOptions, (req, res, next) =>{
     res.end("Not supported!");
})
.delete(cors.corsWithOptions, (req, res, next) =>{
     res.end("Not supported!");
});

module.exports = analysisRouter;