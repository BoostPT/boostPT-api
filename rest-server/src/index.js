import http from 'http';
import { success } from './lib/log';
import './config/database';
import './config/mongoDB';
import app from './config/express';

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, (err) => {
  if (err) throw new Error;
  success('successfully connected to port', PORT);
});

server.on('error', () => {
  server.close(
    setTimeout(server.listen((PORT, () => success('successfully rebooted server!'))), 1000)
  );
});