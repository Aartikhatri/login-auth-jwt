import mongoose from "mongoose";

const url = 'mongodb+srv://aartikhatri223:aarti%401998@cluster0.n7g8g1s.mongodb.net/authentication'

const dbConnection = async ()=> {
     try {
        await mongoose.connect(url)
        console.log("connected to dat basse");
     } catch (error) {
         console.log(error.message);
     }
}

export default dbConnection