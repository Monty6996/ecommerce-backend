const jwt = require('jsonwebtoken');
const fs = require('fs');
const { get } = require('../models/usuarios');

const publicKey = fs.readFileSync('./private/public.pem');

// Verifica si el token de un usuario es valido y si ese usuario existe
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

// Verifica si un usuario tiene permisos de admin
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

// Verifica si el usuario que esta mandando la request es el mismo del token ó si es un admin
const confirmarUsuario = (req, res, next) => {
	if (req.usuario.admin === 0 && req.body.id !== req.usuario.id)
		return res.sendStatus(401);
	next();
};

module.exports = { verificarToken, isAdmin, confirmarUsuario };
