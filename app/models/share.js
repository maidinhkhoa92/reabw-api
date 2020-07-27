const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: "property" },
  email: {
    type: String,
    unique: true
  }
});

schema
  .plugin(timestamp, {
    createdName: "created_at",
    updatedName: "updated_at",
    disableCreated: false,
    disableUpdated: false,
  })
  .plugin(mongoosePaginate);

module.exports = mongoose.model("share", schema);
