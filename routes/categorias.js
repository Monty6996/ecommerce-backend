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
	createCategoria,
	modifyCategoria,
	deleteCategoria,
} = require('../controllers/categorias');

router.get('/', getAll);

router.get('/:id', getSingle);

router.post('/', verificarToken, isAdmin, validateCreate, createCategoria);

router.put('/', verificarToken, isAdmin, validateModify, modifyCategoria);

router.delete('/', verificarToken, isAdmin, deleteCategoria);

module.exports = router;
