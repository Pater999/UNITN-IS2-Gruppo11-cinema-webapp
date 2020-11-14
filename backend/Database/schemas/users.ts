import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Username: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  Password: {
    type: 'String',
    required: true,
    trim: true
  },
  Name: {
    type: 'String',
    required: true,
    trim: true
  },
  Surname: {
    type: 'String',
    required: true,
    trim: true
  },
  Email: {
    type: 'String',
    required: true,
    trim: true
  },
  Role: {
    type: 'String',
    trim: true,
    default: "User"
  }
});

export default userSchema;
