const { model, Schema } = require("mongoose");

const ItemSchema = new Schema({
  item: Array,
  user: { type: Schema.Types.ObjectId, ref: "Usuario" },
});

const Item = model("Item", ItemSchema, "item");
module.exports = Item;
