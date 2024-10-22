import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Input from '../components/Input';
import { Loader, Lock, Mail, User } from "lucide-react";
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';

const SignUpPage = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
    }

    return (
        <motion.div
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl backdrop-filter rounded-2xl shadow-xl overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 8 }}
            transition={{ duration: 0.5 }}
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text'>
                    Crear una cuenta
                </h2>

                <form onSubmit={handleSignup}>
                    <Input
                        icon={User}
                        type='text'
                        placeholder='Nombre completo'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        type='email'
                        placeholder='Correo electronico'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className='text-red-500 font-semibold mt-2 mb-1'>{error}</p>}
                    {/* Password strength meter */}
                    <PasswordStrengthMeter password={password}/>

                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600
						hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Registrarse"}
                    </motion.button>

                </form>
            </div>
            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className="text-sm text-gray-400">
                    Ya tienes una cuenta?{" "}
                    <Link to={"/login"} className='text-blue-400 hover:underline'>
                        Iniciar sesión
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}

export default SignUpPage
