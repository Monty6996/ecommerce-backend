const jwt = require('jsonwebtoken');
const fs = require('fs');
const { get } = require('../models/usuarios');

const publicKey = fs.readFileSync('./private/public.pem');

const verificarToken = async (req, res, next) => {
	const token = req.header('auth');
	if (!token) {
		return res.status(401).json({ error: 'Auth No Valido' });
	}
	try {
		const payload = jwt.verify(token, publicKey);

		const [usuario] = await get({ id: payload.id }, ['eliminado', 'admin']);

		if (!usuario || usuario.eliminado === 1) {
			return res.sendStatus(401);
		}
		req.usuario = { id: payload.id, admin: usuario.admin };
		next();
	} catch (error) {
		res.status(401).json({ error: 'Auth No Valido' });
	}
};

const isAdmin = (req, res, next) => {
	if (!req.usuario) {
		return res.sendStatus(500);
	}
	const { admin } = req.usuario;

	if (admin !== 1) {
		return res.status(401).json({ error: 'No posee los permisos necesarios.' });
	}

	next();
};

const confirmarUsuario = (req, res, next) => {
	if (req.usuario.admin === 0 && req.body.id !== req.usuario.id)
		return res.sendStatus(401);
	next();
};

module.exports = { verificarToken, isAdmin, confirmarUsuario };
