/* eslint-disable no-undef */
const express = require('express');
const multer = require('multer');

const router = express.Router();
const { validateCreate, validateModify } = require('../middleware/productos');
const { verificarToken, isAdmin } = require('../middleware/validaciones');
const {
	getAll,
	getSingle,
	crearProducto,
	modificarProducto,
	eliminarProducto,
} = require('../controllers/productos');

const upload = multer({ dest: './public/tmp' });

// Consultar todos los productos - publico
router.get('/', getAll);

// Consultar un producto por parametro id - publico
router.get('/:id', getSingle);

// Crear un nuevo producto - privado
router.post(
	'/',
	verificarToken,
	isAdmin,
	upload.array('imagenes', '12'),
	validateCreate,
	crearProducto
);

// Modificar un producto por id - privado
router.put('/', verificarToken, isAdmin, validateModify, modificarProducto);

// Eliminar un producto por id - privado
router.delete(
	'/:id',
	verificarToken,
	isAdmin,
	verificarToken,
	eliminarProducto
);

module.exports = router;
