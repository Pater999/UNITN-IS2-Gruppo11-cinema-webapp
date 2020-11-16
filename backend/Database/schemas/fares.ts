import mongoose from "mongoose";

const Schema = mongoose.Schema;

const faresSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
  },
  desc: {
    type: "String",
    required: true,
  },
});

export default faresSchema;
