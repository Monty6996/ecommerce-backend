const express = require('express');

const router = express.Router();
const { update, get } = require('../models/usuarios');
const { validateModify } = require('../middleware/usuarios');

router.get('/all', async (req, res) => {
	try {
		const usuarios = await get({ eliminado: 0, ...req.query });
		res.status(200).json(usuarios);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.get('/single', async (req, res) => {
	try {
		const usuario = await get({ id: req.body.id, elimindado: 0 });
		res.status(200).json(usuario);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.post('/modify', validateModify, async (req, res) => {
	try {
		const message = await update({ id: req.body.id }, req.body);
		res.status(200).json(message);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.delete('/delete', async (req, res) => {
	try {
		const message = await update({ id: req.body.id }, { eliminado: '1' });
		res.status(200).json(message);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
