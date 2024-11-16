var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('./modelo/conexao');

var indexRouter = require('./routes/index');
var livroRouter = require('./routes/livros');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); 
app.use('/', indexRouter);
app.use('/livros', livroRouter);

app.use(function (req, res, next) {
    res.status(404).json({ message: 'Rota não encontrada.' });
});

module.exports = app;
