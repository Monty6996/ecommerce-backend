const express = require('express');

const router = express.Router();
const { v4: uuid } = require('uuid');
const sha1 = require('sha1');
const model = require('../models/usuarios');
const { validateCreate } = require('../middleware/usuarios');

const registro = async (req, res) => {
	try {
		const { nombre, apellido, email, password } = req.body;
		const [exists] = await model.get({ email });
		if (exists) {
			if (exists.eliminado === 0) {
				res.status(400).json(exists);
			} else {
				await model.update({ id: exists.id }, { eliminado: 0 });
				res.status(200).json(exists);
			}
		} else {
			const usuario = {
				id: uuid(),
				nombre,
				apellido,
				email,
				password: sha1(password),
			};
			const message = await model.create(usuario);
			res.status(200).json(message);
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

router.post('/', validateCreate, registro);

module.exports = router;
