import mongoose from "mongoose";

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  Title: {
    type: "String",
    required: true,
  },
  Desc: {
    type: "String",
    required: true,
  },
  ImageUrl: {
    type: "String",
    required: true,
  },
  Plans: [
    {
      Date: { type: Date },
      RoomId: { type: Number },
    },
  ],
});

export default moviesSchema;
