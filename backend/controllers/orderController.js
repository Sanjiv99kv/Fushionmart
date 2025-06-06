
import { orderModel } from '../models/orderModel.js'
import { userModel } from '../models/userModel.js'
import Stripe from 'stripe'
import urlencode from 'urlencode'



const stripe = new Stripe("sk_test_51PzVZhP2ox7QBZEwqGSdqf4bZ0MNMAR8LmxkuGwNsfCLhAWQkt9bOQWPwRi2AFxv4A9owXCWnuLn8EClvwKbMF1Z00bOAIDH90")

export const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'pkr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 278
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount: 49 * 100 * 278
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${urlencode(newOrder._id)}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${urlencode(newOrder._id)}`,
        })

        return res.status(201).json({
            success: true,
            session_url: session.url
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Error"
        })
    }
}

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            return res.status(200).json({
                success: true,
                message: "Paid"
            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            return res.status(400).json({
                success: false,
                message: "Not paid"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Error"
        })
    }
}

export const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        return res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Error"
        })
    }
}

export const listOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        return res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Error"
        })
    }
}

export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        return res.status(201).json({
            success: true,
            message: "Order status updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: "Error"
        })
    }
}