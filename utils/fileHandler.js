/* eslint-disable no-useless-catch */
const { nanoid } = require('nanoid');
const fs = require('fs');

const saveFile = ({ mimetype, path }, destFolder = './public/images') => {
	try {
		const [, ext] = mimetype.split('/');
		const uid = nanoid();
		const fileName = `${uid}.${ext}`;
		const dir = `${destFolder}/${fileName}`;
		fs.createReadStream(path).pipe(fs.createWriteStream(dir));
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
