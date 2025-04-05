import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Sanjeev:asfdsaffsadfasfda@fushionmart.qzzhp.mongodb.net/?retryWrites=true&w=majority&appName=FushionMart')
        .then(() =>
            console.log('Connected!'))
        .catch((err) => {
            console.log(err);
        })
}


