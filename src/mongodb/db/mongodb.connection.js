import mongoose from 'mongoose';
import { mongodbConnectionConfig } from '../configs/mongodb.config.js';

const { host, database, username, password } = mongodbConnectionConfig;
const mongooseUri = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=Cluster0`; // uri 형식으로
const mongodbConnection = mongoose.createConnection(mongooseUri);

mongodbConnection.on('connected', () => console.log('connected'));
mongodbConnection.on('open', () => console.log('open'));
mongodbConnection.on('disconnected', () => console.log('disconnected'));
mongodbConnection.on('reconnected', () => console.log('reconnected'));
mongodbConnection.on('disconnecting', () => console.log('disconnecting'));
mongodbConnection.on('close', () => console.log('close'));

export { mongodbConnection };
