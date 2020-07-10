const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
  address: { type: String, default: "" },
  district: { type: String, default: "" },
  price: { type: Number, default: "" },
  area: { type: Number, default: "" },
  bedRoom: { type: Number, default: "" },
  bathRoom: { type: Number, default: "" },
  photos: { type: Array },
  description: { type: String, default: "" },
  user: { type: Schema.Types.ObjectId, ref: "user" },
  kind: {
    type: String,
    enum: ["house", "apartment"],
    required: true,
    default: "house"
  },
  type: {
    type: String,
    enum: ["sale", "rent"],
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
