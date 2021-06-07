const express = require('express');
const router = express.Router();
const model = require('./../models/users');
const {validateCreate} = require('./../middleware/users')
const { v4: uuid } = require('uuid');
const sha1 = require('sha1');



const registro = async (req, res) => {
  try {
    const {nombre, email, password} = req.body
    [exists] = await model.getSingle({ email: email },{email:'email'});
    console.log(exists);
    if (exists) {
      res.status(400).json(exists);
    } else {
      usuario = {
        id: uuid.v4(),
        nombre,
        email,
        password: sha1(password)
      }
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}



router.post('/registro',validateCreate, registro);






module.exports = router;
