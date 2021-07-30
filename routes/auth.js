const express = require('express');

const router = express.Router();
const { v4: uuid } = require('uuid');
const sha1 = require('sha1');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const model = require('../models/usuarios');
const { validateCreate, validateLogin } = require('../middleware/usuarios');

const privateKey = fs.readFileSync('./private/private.pem');
const singOptions = { algorithm: 'RS256' };
const createToken = (payload) => jwt.sign(payload, privateKey, singOptions);

const registro = async (req, res) => {
	try {
		const { nombre, apellido, email, password } = req.body;
		const [exists] = await model.get({ email });
		if (exists) {
			if (exists.eliminado === 0) {
				res.status(400).json({ error: 'el usuario ya existe!' });
			} else {
				const nuevoUser = await model.update(
					{ id: exists.id },
					{ eliminado: 0, habilitado: 0, ...req.body }
				);
				res.status(200).json(nuevoUser);
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

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const [usuario] = await model.get({ email }, [
			'id',
			'password',
			'eliminado',
			'habilitado',
		]);
		console.log(usuario);

		if (!usuario || usuario.eliminado === 1 || usuario.habilitado === 0) {
			res.status(404).json({ error: 'El usuario no existe' });
		} else if (usuario.password === sha1(password)) {
			const token = createToken({ id: usuario.id });
			res.status(200).json({ JWT: token });
		} else {
			res.status(400).json({ error: 'email o constraseña incorrecta!' });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};

router.post('/registro', validateCreate, registro);

router.post('/login', validateLogin, login);

module.exports = router;
