const { get, create, update } = require('../models/marcas');

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
		let { nombre, ...resto } = req.body;
		nombre.toLowerCase();
		const [resp] = await get({ nombre }, ['id', 'eliminado']);
		if (!resp) {
			const mensaje = await create({ nombre, ...resto });
			return res.status(201).json(mensaje);
		}
		if (res.eliminado === true) {
			await update({ id: resp.id }, { eliminado: false });
			return res.status(201).json(resp.id);
		}
		return res.status(422).json({ error: 'la marca ya existe' });
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

module.exports = {
	getAll,
	getSingle,
	crearMarca,
	modificarMarca,
	eliminarMarca,
};
