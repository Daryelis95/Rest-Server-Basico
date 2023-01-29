const path  = require("path");
const fs = require("fs");
//conexion con cloudinary
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res = response) => {

  try {
    //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'text');
    const nombre = await subirArchivo(req.files, undefined, 'img');
    
    res.json({
      nombre
    })

  } catch (error) {
    res.status(400).json({ error });
  }
    
};
//fines lucrativos
const actualizarArchivo = async (req, res = response) => {

  const {coleccion, id} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con ese id ${id}`
        })
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con ese id ${id}`
        })
      }
      break;
  
    default:
      return res.status(500).json({
        msg: 'No existe esa validacion'
      })
  }

  if (modelo.img) {
    //ruta del archivo
    const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
    //verificar si el archivo existe
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg); //eliminar archivo
    }
  }
  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
}

const actualizarArchivoCloudinary = async (req, res = response) => {

  const {coleccion, id} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con ese id ${id}`
        })
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con ese id ${id}`
        })
      }
      break;
  
    default:
      return res.status(500).json({
        msg: 'No existe esa validacion'
      })
  }
  //limpiar db
  if (modelo.img) {
    //extraer nombre archivo
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length - 1];
    const [ public_id] = nombre.split('.');
    //eliminar archivo
    cloudinary.uploader.destroy(public_id);
  }

  //cargar img
  const { tempFilePath } = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload( tempFilePath );

  modelo.img = secure_url;
  await modelo.save();

  res.json(modelo);
}

const mostrarImg = async (req, res = response) => {

  const {coleccion, id} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con ese id ${id}`
        })
      }
      break;

    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con ese id ${id}`
        })
      }
      break;
  
    default:
      return res.status(500).json({
        msg: 'No existe esa validacion'
      })
  }

  if (modelo.img) {
    //ruta del archivo
    const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
    //verificar si el archivo existe
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg); //retornar archivo
    }
  }
  
  const pathImgError = path.join( __dirname, '../assets', 'no-image.jpg');
  res.sendFile(pathImgError)
  
}

module.exports = {
  cargarArchivo,
  actualizarArchivo,
  actualizarArchivoCloudinary,
  mostrarImg
};
