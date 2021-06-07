const database = require('./dataBase');

const consult = (tabla, donde, selecionar) => database(tabla).where(donde).select(selecionar);
const create = (tabla, obj) => database(tabla).insert(obj);
const modify = (tabla, id, obj) => database(tabla).where(id).update(obj);

module.exports = { consult, create, modify };
