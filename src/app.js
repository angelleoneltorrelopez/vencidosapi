const http = require('http');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const casa = require('./routes/casa');
const humedad = require('./routes/humedad');
const producto = require('./routes/producto');
const ingreso = require('./routes/ingreso');
const proveedor = require('./routes/proveedor');
const politica = require('./routes/politica');
const user = require('./routes/user');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// routes
require('./routes/casa')(app);
require('./routes/humedad')(app);
require('./routes/producto')(app);
require('./routes/ingreso')(app);
require('./routes/proveedor')(app);
require('./routes/politica')(app);
require('./routes/user')(app);

// static files
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app)
  .listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
