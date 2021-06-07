const joi = require('joi');

const schemas = {
	create: joi.object().keys({
		nombre: joi.string().required(),
		password: joi
			.string()
			.pattern(/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
			.required(),
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
		telefono: joi
			.string()
			.pattern(
				/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
			)
			.optional(),
		password: joi
			.string()
			.pattern(/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
			.optional(),
		email: joi
			.string()
			.email({ tlds: { allow: false } })
			.optional(),
	}),
};

module.exports = schemas;