const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/tmp' });

const router = express.Router();

const create = (req, res) => {
    try {
        const idCategoria = req.query.categoria;
    } catch (error) {
        
    }
    
    
    res.end();
}



router.post('/', upload.single("avatar"), create)

router.get('/', (req, res) => {
    res.send('hola');
});






module.exports = router;