const database = require('./dataBase');

const consult = (tabla, donde, selecionar) => database(tabla).where(donde).select(selecionar);
const create = (tabla, obj) => database(tabla).insert(obj);
const modify = (tabla, donde, obj) => database(tabla).where(donde).update(obj);

module.exports = { consult, create, modify };
