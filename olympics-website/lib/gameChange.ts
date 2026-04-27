import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
});

export default mongoose.models.Game || mongoose.model('Game', GameSchema);