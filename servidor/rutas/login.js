const debug = require("debug")("usuarios:servidor:rutas:login");
const chalk = require("chalk");
const express = require("express");
const jwt = require("jsonwebtoken");
const { getUser } = require("../../cli/controladores/ususarios");

const router = express.Router();

router.put("/login", async (req, res, next) => {
  const error = new Error("A surgido un error");
  error.code = 404;
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      error.message = "Faltan credenciales";
      return next(error);
    }
    const id = await getUser(username, password);
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    if (!token) {
      error.message = "No se a podido crear una autorización.";
      return next(error);
    }
    res.json(token);
  } catch (e) {
    next(error);
  }
});

module.exports = router;
