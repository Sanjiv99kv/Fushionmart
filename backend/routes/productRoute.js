import express from 'express'
import { addProduct, listProduct, removeProduct } from '../controllers/productController.js'
import { upload } from '../middleware/multer.js'
const productRouter = express.Router()

productRouter.post("/add",upload.single('image'),addProduct)
productRouter.get("/list",listProduct)
productRouter.get("/remove/:productId",removeProduct)

export default productRouter;