const express = require('express');

const router = express.Router();
const { update, get } = require('../models/usuarios');
const { validateModify } = require('../middleware/usuarios');

router.get('/', async (req, res) => {
	try {
		const usuarios = await get({ eliminado: 0 });
		res.status(200).json(usuarios);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const [usuario] = await get({ id: req.params.id, elimindado: 0 });
		usuario
			? res.status(200).json(usuario)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.post('/', validateModify, async (req, res) => {
	try {
		const message = await update({ id: req.body.id }, req.body);
		res.status(200).json(message);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.delete('/', async (req, res) => {
	try {
		const message = await update({ id: req.body.id }, { eliminado: '1' });
		res.status(200).json(message);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
