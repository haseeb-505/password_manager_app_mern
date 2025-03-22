import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONOGO_DB_URI}/${DB_NAME}`)
        console.log(`\nMonogDB connection is established!!! \n\n\DB HOST/${DB_NAME}: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("DB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;