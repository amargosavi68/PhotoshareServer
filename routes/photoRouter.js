const express = require('express');
const bodyParser = require('body-parser');

const photoRouter = express.Router();

photoRouter.use(bodyParser.json());

//all methods are chained together.
photoRouter.route('/')
.all((req, res, next) =>{
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     next();
})
.get((req, res, next) =>{
     res.end("Will send you soon!");
})
.put((req, res, next) =>{
     res.statusCode = 403;
     res.end("Not Supported!");
})
.post((req, res, next) =>{
     res.end("Will uploading your photo.!");
})
.delete((req, res, next) =>{
     res.end("Deleting all photos!");
});


module.exports = photoRouter;