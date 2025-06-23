import mongoose from "mongoose";

const connect=mongoose.connect("mongodb+srv://root:<pass>@userdata.ltieafe.mongodb.net/?retryWrites=true&w=majority&appName=UserData");

connect.then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

const userSchema = new mongoose.Schema({
    username: { 
        type: String, required: true, unique: true
    },
    email: { 
        type: String, required: true, unique: true 
    },
    password: { 
        type: String, required: true 
    },
});

const collection=new mongoose.model("credentials", userSchema);
export default collection;
