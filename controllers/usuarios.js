const { update, get } = require('../models/usuarios');

const getAll = async (req, res) => {
	try {
		const usuarios = await get({ eliminado: 0 });
		res.status(200).json(usuarios);
	} catch (error) {
		res.sendStatus(500);
	}
};

const getSingle = async (req, res) => {
	try {
		const [usuario] = await get({ id: req.params.id, eliminado: 0 });
		usuario
			? res.status(200).json(usuario)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.sendStatus(500);
	}
};

const modificarUsuario = async (req, res) => {
	try {
		const message = await update({ id: req.body.id }, req.body);
		res.status(200).json(message);
	} catch (error) {
		res.sendStatus(500);
	}
};

const eliminarUsuario = async (req, res) => {
	try {
		const message = await update({ id: req.params.id }, { eliminado: '1' });
		res.status(200).json(message);
	} catch (error) {
		res.sendStatus(500);
	}
};

module.exports = { getAll, getSingle, modificarUsuario, eliminarUsuario };
