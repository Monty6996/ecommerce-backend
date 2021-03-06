const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias');
const marcasRouter = require('./routes/marcas');
const productoImagenRouter = require('./routes/productoImagen')

const app = express();

// MIDDLEWAARES
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// RUTAS
app.use('/usuarios', usersRouter);
app.use('/auth', authRouter);
app.use('/productos', productsRouter, productoImagenRouter);
app.use('/categorias', categoriasRouter);
app.use('/marcas', marcasRouter);

app.use((req, res) => {
	res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
