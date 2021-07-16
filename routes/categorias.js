const express = require('express');

const router = express.Router();
const { get, update, create } = require('../models/categorias');
const { validateCreate, validateModify } = require('../middleware/categorias_marcas');

router.get('/', async (req, res) => {
	try {
		const categorias = await get({ eliminado: 0 });
		res.status(200).json(categorias);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const [categoria] = await get({ eliminado: 0, id: req.params.id });
		console.log(categoria);
		categoria
			? res.status(200).json(categoria)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.post('/', validateCreate, async (req, res) => {
	try {
		const mensaje = await create(req.body);
		res.status(201).json(mensaje);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.put('/', validateModify, async (req, res) => {
	try {
		const mensaje = await update({ id: req.body.id }, req.body);
		res.status(200).json(mensaje);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.delete('/', async (req, res) => {
	try {
		const mensaje = await update({ id: req.body.id }, { eliminado: 1 });
		res.status(200).json(mensaje);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});


module.exports = router;
