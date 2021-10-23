const express = require('express');

const router = express.Router();

router.get('/all', (req, res) => {
	res.send('Todos los pedidos').status(200);
});

module.exports = router;
