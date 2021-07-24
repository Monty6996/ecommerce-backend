const joi = require('joi');

const schemas = {
	create: joi.object().keys({
		nombre: joi.string().required(),
		descripcion: joi.string().required(),
		precio: joi.number().required(),
		stock: joi.number().integer().required(),
		idCategoria: joi.number().integer().required(),
		idMarca: joi.number().integer().required(),
	}),

	modify: joi.object().keys({
		id: joi.number().integer().min(10).max(10).required(),
		nombre: joi.string().optional(),
		descripcion: joi.string().optional(),
		precio: joi.number().optional(),
		stock: joi.number().integer().optional(),
		idCategoria: joi.number().integer().optional(),
		idMarca: joi.number().integer().optional(),
	}),
};

module.exports = { schemas };

// /^([a-zA-Z\s0-9]{10})+$/
