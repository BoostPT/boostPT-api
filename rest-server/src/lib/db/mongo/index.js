import mongoose from 'mongoose';

let roomSchema = mongoose.Schema({
  participants: {
    type: String,
    unique: true
  },
  messages: Array
});

let messageModel = mongoose.model('Message', roomSchema);

module.exports.messageModel = messageModel;
