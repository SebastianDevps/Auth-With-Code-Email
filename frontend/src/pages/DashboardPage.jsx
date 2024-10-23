import React from 'react'
import { motion } from "framer-motion";
import { useAuthStore } from '../store/authStore';

const DashboardPage = () => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className='w-full h-[100vh] flex flex-col'>
            <div className='w-full h-15 p-4 flex backdrop-filter justify-end'>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className='w-30 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
				                font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700
				 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900'
                >
                    Logout
                </motion.button>
            </div>

        </div>
    )
}

export default DashboardPage
