
import db from '../../config/mongoDB';
import mongoose from 'mongoose';
import Messages from '../../lib/db/mongo/index.js';
import {error, success} from "../../lib/log";

export const addChannelController = async (req, res) => {
  try {
    let result = await Messages.messageModel.find({participants: {$regex: 'Jake'}}); 
    success(console.log(result));
    res.status(200).send(result);
  } catch (err) {
    error(err);
    res.status(400).send(err);
  }
}

