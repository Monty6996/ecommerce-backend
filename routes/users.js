const express = require('express');
const router = express.Router();
const model = require('./../models/users');
const { validateCreate } = require('./../middleware/users');
const { v4: uuid } = require('uuid');
const sha1 = require('sha1');

const registro = async (req, res) => {
	try {
		let { nombre, apellido, email, password } = req.body;
		[exists] = await model.getSingle({ email: email }, {id:'id', email:'email', eliminado:'eliminado'});
		console.log(exists);
		if (exists) {
      if (exists.eliminado === 0) {
        res.status(400).json(exists);
      } else {
        await model.update({id: exists.id}, { eliminado: 0 })
        res.status(200).json(exists.id);
      }
		} else {
			const usuario = {
				id: uuid(),
				nombre,
				apellido,
				email,
				password: sha1(password),
			};
			const message = await model.create(usuario);
			res.status(200).json(message);
		}
  } catch (error) {
    console.log(error);
		res.status(500).json({ error });
	}
};

router.post('/registro', validateCreate, registro);

module.exports = router;
