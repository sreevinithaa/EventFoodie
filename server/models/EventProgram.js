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
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      event:{
        type: Schema.Types.ObjectId,
        ref: 'Event'
      },
      fees:{
        type: Number
       
      }
});
const EventProgram = mongoose.model('EventProgram', eventProgramSchema);

module.exports = EventProgram;