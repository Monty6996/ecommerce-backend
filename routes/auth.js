const express = require('express');

const router = express.Router();
const { validateCreate, validateLogin } = require('../middleware/usuarios');
const { registro, login, confirmCorreo } = require('../controllers/auth');

// Registro de usuario - publico
router.post('/registro', validateCreate, registro);

// Login de usuario email & password - publico
router.post('/login', validateLogin, login);

router.get('/confirmacion/:uid', confirmCorreo);

module.exports = router;
