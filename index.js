const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("db connection successful")})
.catch((err)=>{console.log(err)})


app.use(express.json());
app.use("/api/user",userRoute); 
app.use("/api/auth",authRoute);
app.use("/api/products", productRoute);  
app.use("/api/cart", cartRoute);  
app.use("/api/order", orderRoute)

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})