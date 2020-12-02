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
      roomId: { type: 'String' },
      reservations: [
        {
          userId: { type: mongoose.Types.ObjectId },
          fareId: { type: mongoose.Types.ObjectId }
        }
      ]
    }
  ]
});

moviesSchema.virtual('plans.room', {
  ref: 'Rooms',
  localField: 'plans.roomId',
  foreignField: '_id',
  justOne: true
});

moviesSchema.virtual('plans.reservations.user', {
  ref: 'Users',
  localField: 'plans.reservations.userId',
  foreignField: '_id',
  justOne: true
});

moviesSchema.virtual('plans.reservations.fare', {
  ref: 'Fares',
  localField: 'plans.reservations.fareId',
  foreignField: '_id',
  justOne: true
});

export default moviesSchema;
