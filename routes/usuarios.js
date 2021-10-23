const express = require('express');

const router = express.Router();

const { validateModify } = require('../middleware/usuarios');
const {
	verificarToken,
	isAdmin,
	confirmarUsuario,
} = require('../middleware/validaciones');
const {
	getAll,
	getSingle,
	modificarUsuario,
	eliminarUsuario,
} = require('../controllers/usuarios');

// Consultar todos los usuarios - Privado - admin
router.get('/all', verificarToken, isAdmin, verificarToken, getAll);

// Consultar usuario por su id - publico / consultar usuario por id - privado - admin
router.get('/:id', verificarToken, confirmarUsuario, getSingle);

// Modificar usuario por su id - publico / Modificar usuario por id - privado - admin
router.put(
	'/',
	verificarToken,
	confirmarUsuario,
	validateModify,
	modificarUsuario
);

// Eliminar usuario por su id - publico / Eliminar usuario por id - privado - admin
router.delete('/:id', verificarToken, confirmarUsuario, eliminarUsuario);

module.exports = router;
