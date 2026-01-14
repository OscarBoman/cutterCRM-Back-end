import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config();
function getConnectionString(){
    return process.env.DB_SERVER;
}

async function connectToDb() {
    const connectionString = getConnectionString(); 
    try{
        await mongoose.connect(connectionString);
    }
    catch(err){
        console.error(err)
    }
}

export default connectToDb;