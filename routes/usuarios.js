const express = require('express');

const router = express.Router();
const {update, get} = require('../models/usuarios');
const {validateModify} = require('../middleware/usuarios');
const {
    verificarToken,
    isAdmin,
    confirmarUsuario,
} = require('../middleware/validaciones');

const getAll = async (req, res) => {
    try {
        const usuarios = await get({eliminado: 0});
        res.status(200).json(usuarios);
    } catch (error) {
        res.sendStatus(500);
    }
}

const getSingle = async (req, res) => {
    try {
        const [usuario] = await get({id: req.params.id, eliminado: 0});
        usuario
            ? res.status(200).json(usuario)
            : res.status(404).json({error: 'Not Found'});
    } catch (error) {
        res.sendStatus(500);
    }
}

const modificarUsuario = async (req, res) => {
    try {
        const message = await update({id: req.body.id}, req.body);
        res.status(200).json(message);
    } catch (error) {
        res.sendStatus(500);
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const message = await update({id: req.params.id}, {eliminado: '1'});
        res.status(200).json(message);
    } catch (error) {
        res.sendStatus(500);
    }
}

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
