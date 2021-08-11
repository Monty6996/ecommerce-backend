const express = require('express');

const router = express.Router();
const { get, create, update } = require('../models/marcas');
const {
	validateCreate,
	validateModify,
} = require('../middleware/categorias_marcas');
const { verificarToken, isAdmin } = require('../middleware/validaciones');

const getAll = async (req, res) => {
	try {
		const marcas = await get({ eliminado: 0 });
		res.status(200).json(marcas);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getSingle = async (req, res) => {
	try {
		const [marca] = await get({ id: req.params.id, eliminado: 0 });
		marca
			? res.status(200).json(marca)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const crearMarca = async (req, res) => {
	try {
		const mensaje = await create(req.body);
		res.status(201).json(mensaje);
	} catch (error) {
		res.sendStatus(500);
	}
};

const modificarMarca = async (req, res) => {
	try {
		const mensaje = await update({ id: req.body.id }, req.body);
		res.status(201).json(mensaje);
	} catch (error) {
		res.sendStatus(500);
	}
};

const eliminarMarca = async (req, res) => {
	try {
		const mensaje = await update({ id: req.params.id }, { eliminado: 1 });
		res.status(200).json(mensaje);
	} catch (error) {
		res.sendStatus(500);
	}
};

// Consultar Todos los productos - publico
router.get('/', getAll);

// Consultar un producto por id - publico
router.get('/:id', getSingle);

// Crear marca - Privado - admin
router.post('/', verificarToken, isAdmin, validateCreate, crearMarca);

// Modificar marca por id - Privado - admin
router.put('/', verificarToken, isAdmin, validateModify, modificarMarca);

// Eliminar marca por id - Privado - admin
router.delete('/:id', verificarToken, isAdmin, eliminarMarca);

module.exports = router;
