/* eslint-disable no-useless-catch */
// const { nanoid } = require('nanoid');
const { v4: uid } = require('uuid');
const fs = require('fs');
const { s3 } = require('../services/aws');

const saveFile = ({ mimetype, path }, destFolder = './public/images') => {
	try {
		const [, ext] = mimetype.split('/');
		// const uid = nanoid();
		const fileName = `${uid()}.${ext}`;
		const dir = `${destFolder}/${fileName}`;
		const stream = fs.createReadStream(path);
		const params = {
			Bucket: process.env.BUCKET_NAME,
			Key: fileName,
			Body: stream,
		};
		// fs.createReadStream(path).pipe(fs.createWriteStream(dir));

		s3.upload(params, (err, data) => {
			if (err) throw err;
			console.log('subido con exito!');
		});
		fs.unlink(path, (error) => {
			if (error) {
				throw error;
			}
		});
		return fileName;
	} catch (error) {
		throw error;
	}
};

const imgFile = (file) => saveFile(file);

module.exports = { imgFile };
