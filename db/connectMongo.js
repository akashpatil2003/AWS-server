import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to mongodb " + connect.connection.host);

  } catch (error) {
    console.log(`Error connecting db: ${error.message}`);
    process.exit(1);
  }
}

export default connectMongo;