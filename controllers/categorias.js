const { get, update, create } = require('../models/categorias');

const getAll = async (req, res) => {
	try {
		const categorias = await get({ eliminado: 0 });
		res.status(200).json(categorias);
	} catch (error) {
		res.sendStatus(500);
	}
};

const getSingle = async (req, res) => {
	try {
		const [categoria] = await get({ eliminado: 0, id: req.params.id });
		categoria
			? res.status(200).json(categoria)
			: res.status(404).json({ error: 'Not Found' });
	} catch (error) {
		res.sendStatus(500);
	}
};

const createCategoria = async (req, res) => {
	try {
		let { nombre, ...resto } = req.body;
		nombre = nombre.toLowerCase();
		const [resp] = await get({ nombre }, ['id', 'eliminado']);

		if (!resp) {
			const mensaje = await create({ nombre, ...resto });
			return res.status(201).json(mensaje);
		}
		if (resp.eliminado === 1) {
			await update({ id: resp.id }, { eliminado: false });
			return res.status(201).json(resp.id);
		}
		return res.status(422).json({ error: 'La categoria ya existe' });
	} catch (error) {
		res.sendStatus(500);
	}
};

const modifyCategoria = async (req, res) => {
	try {
		const mensaje = await update({ id: req.body.id }, req.body);
		res.status(200).json(mensaje);
	} catch (error) {
		res.sendStatus(500);
	}
};

const deleteCategoria = async (req, res) => {
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
	createCategoria,
	modifyCategoria,
	deleteCategoria,
};
