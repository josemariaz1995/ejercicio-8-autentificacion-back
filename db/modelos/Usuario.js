const { model, Schema } = require("mongoose");

const UsuarioSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Usuario = model("Usuario", UsuarioSchema, "user");
module.exports = Usuario;
