const mongoose = require('mongoose');
const User= mongoose.model('users', {
    firstName:{
        type:String, 
        required: true,
        minlength:2
        // trim:true
    },
    lastName:{
        type:String, 
        required: true,
        minlength:2
        // trim:true
    },

    isActive:{
        type:Number,
        default:0
    }

});
module.exports = {User}
