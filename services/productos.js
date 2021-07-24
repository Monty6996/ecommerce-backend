/* eslint-disable no-useless-catch */
const model = require('../models/productos');
const handler = require('../utils/fileHandler');

const createProducto = async (idProducto, files) => {
	const mensaje = await Promise.all(
		files.map(async (file) => {
			try {
				const uid = handler.imgFile(file);
				const obj = { idProducto, uid };
				const [id] = await model.createimg(obj);
				console.log(id);
				return id;
			} catch (error) {
				throw error;
			}
		})
	);
	console.log(mensaje);
	return mensaje;
};

module.exports = { createProducto };
