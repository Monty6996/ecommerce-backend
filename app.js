const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias');
const marcasRouter = require('./routes/marcas');

const app = express();

// MIDDLEWAARES
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/productos', productsRouter);
app.use('/categorias', categoriasRouter);
app.use('/marcas', marcasRouter);



app.use((req, res) => {
    res.status(404).json({ error:"Not Found"});
});

module.exports = app;
