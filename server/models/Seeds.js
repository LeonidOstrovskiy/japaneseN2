import mongoose from 'mongoose';

const seedsSchema = mongoose.Schema({
  jap: String,
  eng: String,
  indice: Number,
});

export default mongoose.model('Seeds', seedsSchema);
