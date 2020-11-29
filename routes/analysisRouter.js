const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const analysisRouter = express.Router();

analysisRouter.use(bodyParser.json());

analysisRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
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

module.exports = analysisRouter;