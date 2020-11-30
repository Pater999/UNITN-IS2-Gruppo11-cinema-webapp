import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: {
    type: 'String',
    required: true
  },
  desc: {
    type: 'String',
    required: true
  },
  imageUrl: {
    type: 'String',
    required: true
  },
  plans: [
    {
      date: { type: Date },
      roomId: { type: 'String' }
    }
  ]
});

moviesSchema.virtual('plans.room', {
  ref: 'Rooms',
  localField: 'plans.roomId',
  foreignField: '_id',
  justOne : true
});

export default moviesSchema;
