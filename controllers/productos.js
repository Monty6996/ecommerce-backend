const { customAlphabet } = require('nanoid');
const { numbers } = require('nanoid-dictionary');

const { get, update, create } = require('../models/productos');
const { get: getCategoria } = require('../models/categorias');
const { createProductoImagen } = require('../services/productos');

const idproducto = customAlphabet(numbers, 10);

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

const getAll = async (req, res) => {
	try {
		let productos;
		if (req.query.categoria) {
			const [response] = await getCategoria(
				{ nombre: req.query.categoria },
				['id']
			);
			if (!response) return res.sendStatus(404);
			productos = await get({
				idCategoria: response.id,
				'productos.eliminado': 0,
			});
		} else {
			productos = await get({ 'productos.eliminado': 0 });
		}
		res.status(200).json(unirImagenes(productos));
	} catch (error) {
		res.sendStatus(500);
	}
};

const getSingle = async (req, res) => {
	try {
		const producto = await get({
			'productos.id': req.params.id,
			'productos.eliminado': 0,
		});
		producto.length !== 0
			? res.status(200).json(unirImagenes(producto))
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.sendStatus(500);
	}
};

const crearProducto = async (req, res) => {
	try {
		const id = idproducto();
		req.body = { id, ...req.body };
		await create(req.body);
		await createProductoImagen(id, req.files);
		res.status(200).json(id);
	} catch (error) {
		res.sendStatus(500);
	}
};

const modificarProducto = async (req, res) => {
	try {
		const mensaje = await update({ id: req.body.id }, req.body);
		res.status(200).json(mensaje);
	} catch (error) {
		res.sendStatus(500);
	}
};

const eliminarProducto = async (req, res) => {
	try {
		const mensaje = await update({ id: req.params.id }, { eliminado: 1 });
		res.status(200).json(mensaje);
	} catch (error) {
		res.sendStatus(500);
	}
};

module.exports = {
	getAll,
	getSingle,
	crearProducto,
	modificarProducto,
	eliminarProducto,
};
