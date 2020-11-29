const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const Photos = require('../models/photos');
const cors = require('./cors');


var storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'public/images');
     },

     filename: (req, file, cb) => {
          cb(null, file.originalname);
     }
});

const imageFileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error("You can only upload image files."), false);
     }
     cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

//all methods are chained together.
uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) =>{
     res.statusCode = 403;
     res.send("GET Operation not supported!");
})
.post(cors.corsWithOptions, upload.single('imageFile'), (req, res, next) =>{
     //console.log("Request: ", req);
     if (!req.file) {
          res.status(500).send({message: "Upload Failed"});
     }
     else {
          req.body.image = "images/"+req.file.originalname;
          console.log(req.body);
          Photos.create(req.body)
          .then(photo => {
               console.log("Photo uploaded! ", photo)
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(photo);
          }, (err) => next(err))
          .catch(err => next(err));
     }
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