const dataBaseService = require('./../utils/dataBaseService');
const TABLA = 'usuarios';

const getAll = async (selecionar) => {
	return await dataBaseService.consult(TABLA, {}, selecionar);
};

const getSingle = async (donde, selecionar) => {
	return await dataBaseService.consult(
		TABLA,
		donde,
		selecionar
	);
};

const create = async (obj) => {
	return await dataBaseService.create(TABLA, obj);
};

const update = async (id, obj) => {
	return await dataBaseService.modify(TABLA, id, obj);
};

module.exports = { getAll, getSingle, create, update };
