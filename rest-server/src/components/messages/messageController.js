
import db from '../../config/mongoDB';
import mongoose from 'mongoose';
import Messages from '../../lib/db/mongo/index.js';
import {error, success} from "../../lib/log";

export const getChannelsController = async (req, res) => {
  try {
    let username = req.url.slice(1);
    let result = await Messages.messageModel.find({participants: {$regex: username}}); 
    success(console.log(result));
    res.status(200).send(result);
  } catch (err) {
    error(err);
    res.status(400).send(err);
  }
}

export const addChannelController = async (req, res) => {
  let channel = new Messages.messageModel ({
    participants: req.body.channelStr
  })
  try {
    await channel.save();
    success('successfully added new channel');
    res.status(200).send('success');
  } catch (err) {
    error (err);
  }
}

