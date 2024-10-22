import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FloatingShape from './components/FloatingShape'

import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'

import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authStore'
import DashboardPage from './pages/DashBoardPage'


// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};

const App = () => {
    const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <div className='min-h-screen  bg-gradient-to-br from-blue-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden'>
            <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
            <FloatingShape color='bg-indigo-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
            <FloatingShape color='bg-indigo-100' size='w-32 h-32' top='40%' left='-10%' delay={2} />

            <Routes>
                <Route path='/' element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                } />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={
                    <RedirectAuthenticatedUser>
                        <LoginPage />
                    </RedirectAuthenticatedUser>
                } />
                <Route path='/verify-email' element={<EmailVerificationPage />} />
                <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            </Routes>

            <Toaster />
        </div>
    )
}

export default App
