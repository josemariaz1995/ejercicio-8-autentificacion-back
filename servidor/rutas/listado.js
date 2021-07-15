const debug = require("debug")("usuarios:servidor:rutas:listado");
const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const express = require("express");
const {
  getUserByToken,
  getItem,
} = require("../../cli/controladores/ususarios");

const router = express.Router();

router.get("/listado", async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      const error = new Error("No hay autorización");
      error.code = 403;
      return next(error);
    }
    const token = req.header("Authorization").split(" ")[1];
    const datosAutorizacion = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = datosAutorizacion;
    const items = await getItem(id);
    res.json(items);
  } catch (e) {
    if (e.message.includes("expired")) {
      const error = new Error("La autorización a expirado");
      error.code = 403;
      res.status(error.code).json(error.message);
    }
    res.json(e.message);
  }
});

module.exports = router;
