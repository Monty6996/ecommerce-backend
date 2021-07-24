const dataBaseService = require('../utils/dataBaseService');

const TABLA = 'categorias';

const get = (
	donde,
	seleccionar = ['id', 'nombre', 'eliminado', 'ts_create', 'ts_update']
) => dataBaseService.consult(TABLA, donde, seleccionar);

const create = (obj) => dataBaseService.create(TABLA, obj);

const update = (id, obj) => dataBaseService.modify(TABLA, id, obj);

module.exports = { get, create, update };
