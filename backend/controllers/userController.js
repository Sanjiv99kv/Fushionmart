import { userModel } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { generateTokenAndSetCookie } from '../utils/generateToken.js'


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Something went wrong"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        })
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(401).json({
            success: false,
            message: 'Something went wrong'
        })
        const token = generateTokenAndSetCookie(user._id, res)
        return res.status(201).json({
            success: true,
            message: 'Logged in successfully',
            token : token,
            user: {
                ...user._doc,
                password: ""
            }
        })

    } catch (error) {
        console.log("Error in loginController", error);
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(401).json({
                success: false,
                message: "Invalid email"
            })
        }
        if (password.length < 8) {
            return res.status(401).json({
                success: false,
                message: "Password must be at least 8 characters long"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()
        if (newUser) {
            const token = generateTokenAndSetCookie(newUser._id, res)
            return res.status(201).json({
                success: true,
                message: 'Successfully registered',
                token: token
            })
        }
    } catch (error) {
        console.log("Error in registerController", error);
        return res.status(501).json({
            success: false,
            message: "Internal server error"
        })
    }
}