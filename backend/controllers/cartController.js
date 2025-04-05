import { userModel } from '../models/userModel.js'


export const addToCart = async (req, res) => {
    try {
        console.log(req.body.userId);

        let userData = await userModel.findOne({ _id: req.body.userId })

        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        await userData.save();
        return res.status(201).json({
            success: true,
            message: "Item added to cart"
        })
    } catch (error) {
        console.log("Error in cartAdding", error);
        return res.status(501).json({
            success: false,
            message: "Error in adding item to cart"
        })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        return res.status(201).json({
            success: true,
            message: "Item removed from cart"
        })
    } catch (error) {
        console.log("Error in removingCart", error);
        return res.status(501).json({
            success: false,
            message: "Error in removing item from cart"
        })
    }
}

export const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        return res.status(201).json({
            success: true,
            cartData
        })
    } catch (error) {
        console.log("Error in getCart", error);
        return res.status(501).json({
            success: false,
            message: "Error in fetching cart"
        })

    }
}