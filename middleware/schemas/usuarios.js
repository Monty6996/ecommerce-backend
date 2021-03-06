const joi = require('joi');

const schemas = {
	create: joi.object().keys({
		nombre: joi.string().required(),
		apellido: joi.string().required(),
		password: joi
			.string()
			.pattern(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
			.required(),
		telefono: joi.string().optional(),
		email: joi
			.string()
			.email({ tlds: { allow: false } })
			.required(),
	}),
	modify: joi.object().keys({
		id: joi
			.string()
			.guid({
				version: 'uuidv4',
			})
			.required(),
		nombre: joi.string().optional(),
		apellido: joi.string().optional(),
		telefono: joi.string().optional(),
		password: joi
			.string()
			.pattern(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
			.optional(),
		email: joi
			.string()
			.email({ tlds: { allow: false } })
			.optional(),
	}),
	login: joi.object().keys({
		email: joi
			.string()
			.email({ tlds: { allow: false } })
			.required(),
		password: joi
			.string().required(),
	}),
};

module.exports = schemas;
