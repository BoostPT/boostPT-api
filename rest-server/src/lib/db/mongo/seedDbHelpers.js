import mongoose from 'mongoose';
import Messages from './index.js';
import {error, success} from "../../log";

mongoose.connect('mongodb://localhost/boostpt');

export const dropMessagesCollection = async () => {
  try {
    await Messages.messageModel.remove({});
    success('collection removed');
  } catch (err) {
    error('error dropping collection');
  }
}

export const addMessagesDummyData = async () => {
  let message = new Messages.messageModel ({
    userId: 1, 
    text: 'Hello, World!'
  })
  try {
    await message.save();
    success('successfully seeded messages table');
  } catch (err) {
    error('error seeding messages table');
  }
}