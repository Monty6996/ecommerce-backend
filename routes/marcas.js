const express = require('express');

const router = express.Router();

const {
	validateCreate,
	validateModify,
} = require('../middleware/categorias_marcas');
const { verificarToken, isAdmin } = require('../middleware/validaciones');

const {
	getAll,
	getSingle,
	crearMarca,
	modificarMarca,
	eliminarMarca,
} = require('../controllers/marcas');

// Consultar Todos los productos - publico
router.get('/', getAll);

// Consultar un producto por id - publico
router.get('/:id', getSingle);

// Crear marca - Privado - admin
router.post('/', verificarToken, isAdmin, validateCreate, crearMarca);

// Modificar marca por id - Privado - admin
router.put('/', verificarToken, isAdmin, validateModify, modificarMarca);

// Eliminar marca por id - Privado - admin
router.delete('/', verificarToken, isAdmin, eliminarMarca);

module.exports = router;
