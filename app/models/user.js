const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp-plugin");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: { type: String, default: "" },
  fName: { type: String, default: "" },
  lName: { type: String, default: "" },
  telephone: { type: String, default: "" },
  agency: { type: Schema.Types.ObjectId, ref: "user" },
  type: {
    type: String,
    enum: ["agent", "agency", "particular"],
    required: true,
    default: "agent"
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

module.exports = mongoose.model("user", schema);
