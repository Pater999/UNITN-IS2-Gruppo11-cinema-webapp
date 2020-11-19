import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomsSchema = new Schema({
  name: {
    type: "String",
    required: true,
  },
  rows: [Number],
});

export default roomsSchema;
