import mongoose from "mongoose";

let isConnected = false;

export const connectDb: any = async () => {
    mongoose.set('strictQuery',true)
    if (isConnected) {
        console.log("MongoDB is connected");
    }
    try {
        {/* @ts-expect-error */}
        mongoose.connect(process.env.MONGODB_URI,{
           dbName: "gallery",
           useNewUrlParser: true,
           useUnifiedTopology: true
        })
        console.log('Database Connected....');
        
    } catch (error) {
        
    }
}