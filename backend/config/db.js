import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://xe54z:abishek2023@cluster0.3ccdllk.mongodb.net/item-del').then(()=>console.log("DB connected"));
}