import mongoose from 'mongoose' 
import dotenv from 'dotenv'
dotenv.config();

const DB_URL = process.env.DB_URL;
const connectToMongo = async (req,res) => {
   try{
     await mongoose.connect(DB_URL,{});
     
    console.log("DB connected")
   } catch(error) {
   console.error(error);
   }
}


export default connectToMongo;