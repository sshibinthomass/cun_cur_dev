const mongoose = require('mongoose');
const schema = mongoose.Schema;
const savedDataSchema = new schema(
    {
         uId :
         {
           type : mongoose.ObjectId,
           required : true  
         },
         date: 
         {
            type : date,
            required : true
         },
         fromCur:
         {
            type : Number,
            required : true
         },
         toCur:{
            type : Number,
            required : true
         },
         fromVal:{
            type : Number,
            required : true
         },
         toVal:{
            type : Number,
            required : true
         }
    }
);
module.exports = mongoose.model('SavedData',savedDataSchema);