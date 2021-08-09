const { schemas } = require('./schemas/productos');

const validateCreate = (req, res, next) => {
	const { error } = schemas.create.validate(req.body);
	error ? res.status(406).json({ message: error.details[0].message }) : next();
};

const validateModify = (req, res, next) => {
	if (Object.entries(req.body).length === 0)
		return res.status(400).json({ error: 'No puede dejar todos los campos vacios' });
	const { error } = schemas.modify.validate({ id: req.params.id, ...req.body });
	error ? res.status(406).json({ message: error.details[0].message }) : next();
};

module.exports = { validateCreate, validateModify };
