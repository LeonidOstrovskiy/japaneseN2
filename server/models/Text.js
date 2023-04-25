import mongoose from 'mongoose';

const textSchema = mongoose.Schema({
  lesson: Number,
  texts: [
    {
      jap: String,
      kana: String,
      eng: String,
    },
  ],
});

export default mongoose.model('Text', textSchema);
