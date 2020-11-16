import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomsSchema = new Schema({
  Name: {
    type: "String",
    required: true,
  },
  Rows: [Number],
});

export default roomsSchema;
