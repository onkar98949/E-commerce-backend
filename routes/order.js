const router = require('express').Router();
const Order = require('../models/Order ')
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require('./verifyToken')


//create order 
router.post("/",verifyToken,async(req,res)=>{
   const newOrder = new Order(req.body)

   try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
   }catch(err){
        res.status(500).json(err)
   }
})


//update order
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
 
   try{
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
      {
         $set:req.body,
      }, 
      {new:true}
      ) 

      res.status(200).json(updatedOrder);
   }catch(err){
     res.status(501).json(err)
   }
})

//delete order
router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
   try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
   }catch(err){
      res.status(500).json(err)
   }
})


//get user orders
router.get('/find/:userid',verifyTokenAndAuthorization,async(req,res)=>{
   try{
        const orders = await Order.find({userId:req.params.userid}) 
        res.status(200).json(orders)
   }catch(err){
      res.status(500).json(err)
   }
})


//get all products

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
      try{
         const orders  = await Order.find();
         res.status(200).json(orders)
      }catch(err){
         res.status(500).json(err)
      }
})


module.exports = router; 