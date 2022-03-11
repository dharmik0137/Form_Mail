const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    email:
    {
        type:String
    },
    password:
    {
        type:Number
    }
})

const Data = mongoose.model("data",dataSchema);
module.exports = Data;