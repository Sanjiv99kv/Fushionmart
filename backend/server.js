import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv'
dotenv.config();


const app = express()
const port = 4000;


app.use(express.json())
app.use(cors())
app.use(express.static("uploads"))

app.use("/api/product",productRouter)
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log(`Server Started at http://localhost:${port}`);
    connectDB();
})
