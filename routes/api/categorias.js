const { Router } = require("express");
const { check } = require("express-validator");
const {
  postCategoria,
  getCategoriaId,
  getCategorias,
  putCategoria,
  deleteCategoria,
} = require("../../controllers/categorias");
const { existeIdCategory } = require("../../helpers/dbValidator");

const {
  validarCampos,
  validarJwt,
  validarRoles,
} = require("../../middlewares");

class CategoriaRouter {
  baseUrl = "/categorias";
  router = Router();
  constructor() {
    this.rutas();
  }

  rutas() {
    //obtener categorias - publica
    this.router.get("/", getCategorias);
    // obtener categoria por id - publico
    this.router.get(
      "/:id",
      [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeIdCategory),
        validarCampos,
      ],
      getCategoriaId
    );

    //Crear categoria - privado - calquiera con token valido
    this.router.post(
      "/",
      [
        validarJwt,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
      ],
      postCategoria
    );

    //Actualizar - privado - calquiera con token valido
    this.router.put(
      "/:id",
      [
        validarJwt,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeIdCategory),
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
      ],
      putCategoria
    );

    //Eliminar categoria -Admin
    this.router.delete(
      "/:id",
      [
        validarJwt,
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeIdCategory),
        validarRoles("ADMIN_ROLE"),
        validarCampos,
      ],
      deleteCategoria
    );
  }
}

module.exports = new CategoriaRouter();
