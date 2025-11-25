import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongodb connect successfully")
    }catch (error){
        console.log("Mongodb connnection error",error)
    }
}
export default connectDB;