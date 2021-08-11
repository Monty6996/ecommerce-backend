/* eslint-disable no-unused-expressions */
const schemas = require('./schemas/usuarios');

const validateCreate = (req, res, next) => {
	const { error } = schemas.create.validate(req.body);
	error ? res.status(422).json({ message: error.details[0].message }) : next();
};

const validateModify = (req, res, next) => {
	const { error } = schemas.modify.validate(req.body);
	error ? res.status(406).json({ message: error.details[0].message }) : next();
};

const validateLogin = (req, res, next) => {
	const { error } = schemas.login.validate(req.body);
	error ? res.status(406).json({ message: error.details[0].message }) : next();
};

module.exports = { validateCreate, validateModify, validateLogin };
