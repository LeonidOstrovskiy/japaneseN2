import mongoose from 'mongoose';

export const connect = async (url) => {
  return mongoose.connect(url);
};
