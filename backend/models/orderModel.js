import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true,
        default:{}
    },
    status:{
        type:String,
        default:"Product Loading"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        default:false
    }
})

export const orderModel = mongoose.model("Order",orderSchema);
