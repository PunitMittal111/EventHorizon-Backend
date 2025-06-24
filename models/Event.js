import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  location: String,
  organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
