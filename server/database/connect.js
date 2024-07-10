import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://divyang0024:${process.env.DB_PASSWORD}@cluster0.9strayb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("server is successfully connected.");
  } catch (err) {
    console.log(err);
  }
};
