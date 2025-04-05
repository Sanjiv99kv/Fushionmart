import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
    const { token } = req.headers
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user Login again"
        })

    }
    try {
        const token_decode = jwt.verify(token, process.env.SECRET)
        req.body.userId = token_decode.userId;
        next();
    } catch (error) {
        console.log("Error in middleware", error);
        return res.status(501).json({
            success: false,
            message: "Invalid token"
        })

    }
}