const mongoose = require('mongoose');

const { Schema } = mongoose;
const EventProgram = require('./EventProgram');
const eventSchema = new Schema({

    eventName: {
        type: String,
        required: true,
        trim: true
      },
      venue: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true,
        trim: true
      },
      imageUrl: {
        type: String,
        required: true,
        trim: true
      },
      description: {
      
        type: String,
        required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      programs:[EventProgram]
});
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;