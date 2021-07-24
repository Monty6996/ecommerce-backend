const joi = require('joi');

const schemas = {
	create: joi.object().keys({
		nombre: joi.string().required(),
	}),
	modify: joi.object().keys({
		id: joi.number().required(),
		nombre: joi.string().optional(),
	}),
};

module.exports = schemas;
