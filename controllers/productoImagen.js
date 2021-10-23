const {
	createProductoImagen,
	deleteProductoImagen,
} = require('../services/productos');
const { get, getImagen } = require('../models/productos');

const mostrarImagen = (req, res) => {

	const url = `${process.env.S3_URL}${req.params.idImagen}`;

	res.redirect(200, url);
};

const agregarImagen = async (req, res) => {
	if (req.files.length === 0) return res.sendStatus(400);
	try {
		const result = await get({ 'productos.id': req.params.idProducto });
		if (result.length === 0) {
			return res.status(404).json({ message: 'El Producto No Existe' });
		}
		const id = await createProductoImagen(req.params.idProducto, req.files);
		return res.status(202).json(id);
	} catch (error) {
		res.status(500).json({
			error: 'Internal Server Error',
			message: error,
		});
		console.log(error);
	}
};

const deleteImagen = async (req, res) => {
	try {
		let result = await getImagen({ uid: req.params.idImagen });
		if (result.length === 0) {
			return res.status(404).json({ error: 'Imagen no encontrada' });
		}
		result = await deleteProductoImagen(req.params.idImagen);
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: 'Internal Server Error',
			message: error,
		});
	}
};

module.exports = { mostrarImagen, agregarImagen, deleteImagen };
