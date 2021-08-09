/* eslint-disable no-useless-catch */
const fs = require('fs');
const { createimg, deleteimg } = require('../models/productos');
const handler = require('../utils/fileHandler');

const createProductoImagen = async (idProducto, files) => {
	const mensaje = await Promise.all(
		files.map(async (file) => {
			try {
				const uid = handler.imgFile(file);
				const obj = { idProducto, uid };
				const [id] = await createimg(obj);
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

const deleteProductoImagen = async (idImagen) => {
	try {
		fs.unlink(`./public/images/${idImagen}`, (error) => {
			if (error) {
				throw error;
			}
		});
		const result = await deleteimg({ uid: idImagen });
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { createProductoImagen, deleteProductoImagen };
