const Item = require("../../db/modelos/Item");
const Usuario = require("../../db/modelos/Usuario");

const getUser = async (username, password) => {
  const { _id: id } = await Usuario.findOne({ username, password }).select(
    "_id"
  );
  return id;
};
const getItem = async (id) => {
  const { item } = await Item.findOne().where({ user: id }).select("item -_id");
  return item;
};
module.exports = {
  getUser,
  getItem,
};
