const db = require('../utils/dataBase');

const tabla = 'productos';

const get = (donde) =>
	db(tabla)
		.where(donde)
		.select([
			'productos.id',
			'productos.nombre',
			'productos.descripcion',
			'productos.precio',
			'productos.stock',
			'categorias.nombre as categoria',
			'marcas.nombre as marca',
			'productoImagen.uid as imagenes',
		])
		.innerJoin('categorias', 'productos.idCategoria', 'categorias.id')
		.innerJoin('marcas', 'productos.idMarca', 'marcas.id')
		.innerJoin('productoImagen', 'productos.id', 'productoImagen.idProducto');

const create = (obj) => db(tabla).insert(obj);
const update = (id, obj) => db(tabla).where(id).update(obj);

const createimg = (img) => db('productoImagen').insert(img);

module.exports = { get, create, update, createimg };
