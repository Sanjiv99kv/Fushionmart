import { productModel } from "../models/productModel.js";
import fs from 'fs'

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file.filename;

        const product = new productModel({
            name,
            description,
            price,
            category,
            image
        })

        await product.save()
        return res.status(201).json({
            success: true,
            message: "Procuct Added successfully"
        })
    } catch (error) {
        console.log("Error in AddProduct controller", error)
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        })

    }
}

export const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({});
        if (!product) {
            return res.status(401).json({
                success: false,
                message: "No product found"
            })
        }
        return res.status(201).json({
            success: true,
            message: "Product List",
            product
        })
    } catch (error) {
        console.log("Error in ListProduct controller", error)
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await productModel.findById({ _id: productId })
        if (!product) {
            return res.status(401).json({
                success: false,
                message: "Product not found"
            })
        }
        fs.unlink(`uploads/images/${product.image}`, () => { })
        await productModel.findByIdAndDelete({ _id: productId })
        return res.status(201).json({
            success: true,
            message: "Product Removed Successfully"
        })
    } catch (error) {
        console.log("Error in removeProduct Controller", error)
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        })
    }
}

