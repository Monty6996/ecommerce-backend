const express = require('express');
const multer = require('multer');

const router = express.Router();

// Enviar Imagen por Id - publico
router.get('/imagen/:id', (req, res) => {
	const options = {
		root: `./public/images`,
	};

	res.sendFile(req.params.id, options, (err) => {
		err ? res.sendStatus(404) : null;
	});
});




module.exports = router;