/* eslint-disable no-undef */
const express = require('express');
const multer = require('multer');
const { customAlphabet } = require('nanoid');
const { numbers } = require('nanoid-dictionary');
const { validateCreate, validateModify } = require('../middleware/productos');
const { get, update, create } = require('../models/productos');
const { createProducto } = require('../services/productos');
const { verificarToken, isAdmin } = require('../middleware/validaciones');

const upload = multer({ dest: './public/tmp' });
const idproducto = customAlphabet(numbers, 10);

const router = express.Router();

// Funcion que une todas las consultas en una sola array de imagenes
const unirImagenes = (array) => {
	const temp = [];
	array.forEach((columna) => {
		const elementoindex = () =>
			temp.findIndex((element) => element.id === columna.id);
		if (elementoindex() === -1) {
			temp.push({
				...columna,
				imagenes: [],
			});
		}
		temp[elementoindex()].imagenes.push(
			`${process.env.URL}/productos/imagen/${columna.imagenes}`
		);
	});
	return temp;
};

// Consultar todos los productos - publico
router.get('/', async (req, res) => {
	try {
		const productos = await get({ 'productos.eliminado': 0 });
		res.status(200).json(unirImagenes(productos));
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Consultar un producto por parametro id - publico
router.get('/:id', async (req, res) => {
	try {
		const producto = await get({
			'productos.id': req.params.id,
			'productos.eliminado': 0,
		});
		producto !== []
			? res.status(200).json(unirImagenes(producto))
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Crear un nuevo producto - privado
router.post(
	'/',
	verificarToken,
	isAdmin,
	upload.array('imagenes', '12'),
	validateCreate,
	async (req, res) => {
		try {
			console.log(req.files);
			const id = idproducto();
			req.body = { id, ...req.body };
			await create(req.body);
			await createProducto(id, req.files);
			res.status(200).json(id);
		} catch (error) {
			console.log(error);
			res.sendStatus(500);
		}
	}
);

// Modificar un producto por id - privado
router.put('/', verificarToken, isAdmin, validateModify, async (req, res) => {
	try {
		const mensaje = await update({ id: req.body.id }, req.body);
		res.status(200).json(mensaje);
	} catch (error) {
		res.sendStatus(500);
	}
});

// Eliminar un producto por id - privado
router.delete('/', verificarToken, isAdmin, verificarToken, async (req, res) => {
	try {
		const mensaje = await update({ id: req.body.id }, { eliminado: 1 });
		res.status(200).json(mensaje);
	} catch (error) {
		res.sendStatus(500);
	}
});

module.exports = router;
