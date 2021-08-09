const express = require('express');

const router = express.Router();
const { update, get } = require('../models/usuarios');
const { validateModify } = require('../middleware/usuarios');
const {
	verificarToken,
	isAdmin,
	confirmarUsuario,
} = require('../middleware/validaciones');

router.get('/all', verificarToken, isAdmin, verificarToken, async (req, res) => {
	try {
		const usuarios = await get({ eliminado: 0 });
		res.status(200).json(usuarios);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

router.get('/:id', verificarToken, confirmarUsuario, async (req, res) => {
	try {
		const [usuario] = await get({ id: req.params.id, eliminado: 0 });
		usuario
			? res.status(200).json(usuario)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

router.put(
	'/:id',
	verificarToken,
	confirmarUsuario,
	validateModify,
	async (req, res) => {
		console.log(req.body);

		try {
			const message = await update({ id: req.params.id }, req.body);
			res.status(200).json(message);
		} catch (error) {
			console.log(error);
			res.sendStatus(500);
		}
	}
);

router.delete('/:id', verificarToken, confirmarUsuario, async (req, res) => {
	try {
		const message = await update({ id: req.params.id }, { eliminado: '1' });
		res.status(200).json(message);
	} catch (error) {
		res.sendStatus(500);
	}
});

module.exports = router;
