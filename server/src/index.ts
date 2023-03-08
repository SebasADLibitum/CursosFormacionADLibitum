import dotenv from 'dotenv';
import Server from "./config/server";
import mySqlConnection from './db/connectDB'

dotenv.config();

const server = new Server()
