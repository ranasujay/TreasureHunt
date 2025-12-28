import mongoose from 'mongoose';
import dbgr from 'debug';

const debug = dbgr("development:mongoose");

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.error(err);
    }
  };

export default connectDB;