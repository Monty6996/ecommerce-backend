const schemas = require('./schemas/products');

const validateCreate = (req, res, next) => {
	const { error } = schemas.create.validate(req.body);
	// eslint-disable-next-line no-unused-expressions
	error ? res.status(422).json({ message: error.details[0].message }) : next();
};

const validateModify = (req, res, next) => {
	const { error } = schemas.modify.validate(req.body);
	// eslint-disable-next-line no-unused-expressions
	error ? res.status(422).json({ message: error.details[0].message }) : next();
};

module.exports = { validateCreate, validateModify };
