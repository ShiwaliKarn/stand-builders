import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("DB Connected"));
   
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};
