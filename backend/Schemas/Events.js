const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  regestrationEndDate :{
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v < this.date;
      },
      message: 'Registration end date should be before the event date.',
    },
  },
  description: {
    type: String,
    required: true
  },
  college_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
  },
  maxParticipants: {
    type: Number,
    required: true
  },
  currentParticipants: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active',
  },
});

eventSchema.index({ college_id: 1, title: 1 }, { unique: true });

const Event = mongoose.model('events', eventSchema);
module.exports = Event;
