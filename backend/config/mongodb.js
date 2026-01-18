import mongoose from "mongoose";

const connectDB = async () =>{

    mongoose.connection.on('connected', ()=> console.log('Databse Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/SupplySight`) //when connection established, it will create a new database named "GharTak" in Atlas
}

export default connectDB