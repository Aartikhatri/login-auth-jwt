import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : [true , "Please enter username"],
        unique : true
    },
    useremail : {
        type: String,
        required : [true , "Please enter email"],
        unique : true
    },
    password : {
        type: String,
        required : [true , "Please enter password"],
    },

    firstname : { type : String},
    lastname : { type : String} ,
    address : { type : String},
    profileImage : { type : String},
    mobile : { type : Number}

})

const userModel = mongoose.model("userDetails" , userSchema)

export {userModel }