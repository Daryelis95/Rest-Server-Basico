
const {v4 : uuidv4} = require('uuid');
const path = require('path');
const extensiones = ["png", "jpg", "jpeg"];

const subirArchivo = (files, extensionValida = extensiones, carpeta = '') => {
  return new Promise((resolve, reject) => {
    // Nombre de archivo y ruta
    const { archivo } = files;
    const reName = archivo.name.split(".");
    const extension = reName[reName.length - 1];

    //Validar extensiones
    if (!extensionValida.includes(extension)) {
        return reject( `La extesion ${extension} no es valida, Permitidas : ${extensionValida}`);
    }

    //nombre temporal
    const nombreTemporal = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads", carpeta, nombreTemporal);

    //mover archivo
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      
      resolve(nombreTemporal);
    });
  });
};

module.exports = {
  subirArchivo,
};
