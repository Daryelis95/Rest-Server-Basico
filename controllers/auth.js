const { response } = require("express");
const bcrytjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  //verificar si usuario existe
  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    return res.status(400).json({
      msg: "Usuario incorrecto",
    });
  }
  //verificaar si esta activo
  if (!usuario.estado) {
    return res.status(400).json({
      msg: "Usuario desabilitado",
    });
  }
  //verificar contrasena
  const validPassword = bcrytjs.compareSync(password, usuario.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "Contrasena incorrecta",
    });
  }

  //Generar jwt
  const token = await generarJWT(usuario.id);

  res.status(200).json({
    usuario,
    token,
  });
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { nombre, correo, img } = await googleVerify(id_token);

    //validar si usuario existe
    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":p",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    //validar si usuario fue eliminado
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    //Generar jwt
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
