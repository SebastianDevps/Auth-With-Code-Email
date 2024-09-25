import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({
        succes: false,
        message: "No autorizado - no se proporcionó token"
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) return res.status(401).json({
            succes: false,
            message: "No autorizado - token invalido"
        })

        req.userId = decoded.userId;
        next() // allow execute the next fuction checkAuth
    } catch (error) {
        console.log("error in verifyToken", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}