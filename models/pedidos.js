const dataBaseService = require('../utils/dataBaseService');

const TABLA = 'pedidos';

const get = (
    donde,
    seleccionar = []
) => dataBaseService.consult(TABLA, donde, seleccionar);

const create = (obj) => dataBaseService.create(TABLA, obj);

const update = (id, obj) => dataBaseService.modify(TABLA, id, obj);

module.exports = { get, create, update };