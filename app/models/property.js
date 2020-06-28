const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, default: "" },
  description: { type: String, default: "" },
  price: { type: Number, default: "" },
  bedRoom: { type: Number, default: "" },
  bathRoom: { type: Number, default: "" },
  area: { type: Number, default: "" },
  city: { type: String, default: "" },
  district: { type: String, default: "" },
  photo: { type: Number, default: "" },
  agency: { type: Schema.Types.ObjectId, ref: "user" },
  type: {
    type: String,
    enum: ["sale", "rent", "particular"],
    required: true,
    default: "sale"
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  }
});

schema
  .plugin(timestamp, {
    createdName: "created_at",
    updatedName: "updated_at",
    disableCreated: false,
    disableUpdated: false
  })
  .plugin(mongoosePaginate);

module.exports = mongoose.model("properties", schema);
