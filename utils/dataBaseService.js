const database = require('./dataBase');

const create = (tabla, obj) => database(tabla).insert(obj);
const modify = (tabla, id, obj) => database(tabla).where({ id }).update(obj);

module.exports = { create, modify };
