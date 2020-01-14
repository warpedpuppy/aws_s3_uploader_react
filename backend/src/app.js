const express = require('express')
const app = express();
const cors = require('cors');
const uploaderRouter = require('../uploader/uploader-router');
app.use(cors());
app.use('/api/uploader', uploaderRouter);

module.exports = app;