const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventProgramSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true
      },
      startTime: {
        type: Date,
        required: true,
        default: Date.now
      },
      endTime: {
        type: Date,
        required: true,
        default: Date.now
      },
      fees:{
        type: Number
       
      }
});
const EventProgram = mongoose.model('EventProgram', eventProgramSchema);

module.exports = EventProgram;