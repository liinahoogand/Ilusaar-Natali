import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB ühendatud");
  } catch (error) {
    console.error("MongoDB ühendamine nurjus:", error.message);
    process.exit(1);
  }
};

export default connectDB;
