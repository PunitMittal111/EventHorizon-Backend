import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isOrganizer: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
