import mongoose from 'mongoose';
import {error, success} from "../../log";

let messagesSchema = mongoose.Schema({
  userId: Number,
  text: String, 
});

let messageModel = mongoose.model('Message', messagesSchema);

module.exports.messageModel = messageModel;