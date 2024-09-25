import bcryptjs from 'bcryptjs'
import crypto from "crypto";
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { 
    sendPasswordResetEmail, 
    sendVerificationEmail, 
    sendWelcomeEmail, 
    sendResetSuccessEmail
} from '../email/emailSend.js';
import { User } from '../models/user.model.js'

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error("Todos los campos son requeridos");
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "El usuario ya se encuentra registrado"
            });
        }

        const hashPass = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashPass,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        })

        await user.save();

        // jwt  
        generateTokenAndSetCookie(res, user._id);
        sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "El codigo de verificacion es invalido o expiro"
            })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            success: true,
            message: "Cuenta verificada exitosamente",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("error in verifyEmail", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Usuario y/o Contraseña incorrecto"
            })
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Usuario y/o Contraseña incorrecto"
            })
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            success: true,
            message: "Sesion iniciada exitosamente",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        console.log("error in login", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Sesion cerrada exitosamente",
    })
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 //1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save()

        //send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        
        res.status(200).json({
            success: true,
            message: "Link para restablecer contraseña enviado a tu email"
        })
    } catch (error) {
        console.log("error in forgotPassword", error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ 
                success: false, 
                message: "Token de reinicio no válido o vencido" 
            });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ 
            success: true, 
            message: "Restablecimiento de contraseña exitoso" 
        });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ 
            success: false,
            message: error.message 
        });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ 
                success: false, 
                message: "Usuario no encontrado" 
            });
		}

		res.status(200).json({ 
            success: true, 
            user 
        });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ 
            success: false,
            message: error.message 
        });
	}
};