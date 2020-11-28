const express = require('express');
const bodyParser = require('body-parser');

const analysisRouter = express.Router();

analysisRouter.use(bodyParser.json());

analysisRouter.route('/')
.all((req, res, next) => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
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
     res.end("Not supported!");
})
.delete((req, res, next) =>{
     res.end("Not supported!");
});