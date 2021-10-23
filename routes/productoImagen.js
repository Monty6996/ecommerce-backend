const express = require('express');

const router = express.Router();
const multer = require('multer');
const { isAdmin, verificarToken } = require('../middleware/validaciones');
const {
	mostrarImagen,
	agregarImagen,
	deleteImagen,
} = require('../controllers/productoImagen');

const upload = multer({ dest: './public/tmp' });

// Enviar Imagen por Id - publico
router.get('/imagen/:idImagen', mostrarImagen);

// Agregar Imagenes a un Producto por id - privado
router.put(
	'/imagen/:idProducto',
	verificarToken,
	isAdmin,
	upload.array('imagenes', '10'),
	agregarImagen
);

// Eliminar una Imagen - privado
router.delete('/imagen/:idImagen', verificarToken, isAdmin, deleteImagen);

module.exports = router;
