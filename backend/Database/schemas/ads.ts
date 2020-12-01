import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adsSchema = new Schema({
  title: {
    type: "String",
    required: true,
  },
  ad: {
    type: "String",
    required: true,
  },
  desc: {
    type: "String",
    required: true,
  },
});

export default adsSchema;
