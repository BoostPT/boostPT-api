import Messages from './index.js';
import {error, success} from "../../log";

export const dropMessagesCollection = async () => {
  try {
    await Messages.messageModel.remove({});
    success('Messages collection removed');
  } catch (err) {
    error('error dropping Messages collection');
  }
};

export const addMessagesDummyData = async () => {
  let message = new Messages.messageModel ({
    participants: 'gus:Jim',
    messages: [
      {
        user: 'gus',
        text: 'hello world', 
      },
      {
        user: 'Jim',
        text: 'goodbye world', 
      },
      {
        user: 'gus',
        text: 'its been fun', 
      },
    ],
  });
  try {
    await message.save();
    success('successfully seeded messages table');
  } catch (err) {
    error('error seeding messages table');
  }
};

