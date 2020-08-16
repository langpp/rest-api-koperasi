var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config/config.js');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
app.set('superSecret', config.secret);
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(fileUpload({
    createParentPath: true
}));

app.use(morgan('dev'));

const db = require('./models/index.js');

require('./routes/routes.js')(app);

// Create a Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})