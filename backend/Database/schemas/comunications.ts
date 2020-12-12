import mongoose from "mongoose";

const Schema = mongoose.Schema;

const comunicationsSchema = new Schema({
  title: {
    type: "String",
    required: true,
  },
  desc: {
    type: "String",
    required: true,
  },
  date: {
    type: "String",
    required: true,
  },
});

export default comunicationsSchema;
