const dataBaseService = require('../utils/dataBaseService');

const TABLA = 'usuarios';

const get = (
	donde,
	seleccionar = [
		'id',
		'nombre',
		'apellido',
		'email',
		'telefono',
		'habilitado',
		'eliminado',
	]
) => dataBaseService.consult(TABLA, donde, seleccionar);

const create = (obj) => dataBaseService.create(TABLA, obj);

const update = (id, obj) => dataBaseService.modify(TABLA, id, obj);

module.exports = { get, create, update };
