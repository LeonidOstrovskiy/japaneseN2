import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lessons: Number,
    score: Number,
    progress: [[Number]],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
