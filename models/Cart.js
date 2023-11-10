const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    products:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            }
        }
    ],
    amount:{type :Number,required:true},
    address:{type:object ,required:true},
    status:{type:String , default:"pending"}
},
{timestamps:true}
)
   
module.exports= mongoose.model("Cart",cartSchema);