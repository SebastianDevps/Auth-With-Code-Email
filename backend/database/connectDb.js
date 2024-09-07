import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${con.connection.host}`)
    } catch (error) {
        console.log("Error conecction to MongoDb: ", error.message)
        process.exit(1)
        // 1 is failure, 0 status code is success
    }
}



