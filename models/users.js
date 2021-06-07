const dataBaseService = require('./../utils/dataBaseService');
const TABLA = 'usuarios';

const getAll = async (selecionar) => {
    return await dataBaseService.consult(TABLA, { habilitado: 1 }, selecionar );
};

const getSingle = async (donde,selecionar) => {
    return await dataBaseService.consult(TABLA, {habilitado:1, ...donde}, selecionar );
}

const create = async (obj) => {
    return await dataBaseService.create(TABLA, obj);
}

const update = async (obj) => {
    return await dataBaseService.update(TABLA, obj)
}

module.exports = { getAll, getSingle, create, update };
