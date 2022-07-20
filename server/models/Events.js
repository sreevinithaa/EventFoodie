const mongoose = require('mongoose');

const { Schema } = mongoose;

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
        required: true,
        default: Date.now
      },
      endDate: {
        type: Date,
        required: true, 
        default: Date.now
      },
      programs:[{
        type: Schema.Types.ObjectId,
        ref: 'EventProgram'
      }]
});
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;