import React from 'react'
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "Almenos 6 caracteres", met: password.length >= 6 },
        { label: "Contiene una letra mayuscula ", met: /[A-Z]/.test(password) },
        { label: "Contiene una letra minuscula", met: /[a-z]/.test(password) },
        { label: "Contiene un numero", met: /\d/.test(password) },
        { label: "Contiene caracteres especiales", met: /[^A-Za-z0-9]/.test(password) },
    ];

    return (
        <div className='mt-2 space-y-1'>
            {criteria.map((item, index) => (
                <div key={item.label} className='flex items-center text-xs'>
                    {item.met ? (
                        <Check className='size-4 text-green-500 mr-2' />
                    ) : (
                        <X className='size-4 text-gray-500 mr-2' />
                    )}
                    <span className={item.label ? "text-green-500" : "text-gray-500"}>{item.label}</span>
                </div>
            ))}
        </div>
    )
}

const PasswordStrengthMeter = ({ password }) => {
    
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
        if (pass.match(/\d/)) strength++;
        if (pass.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    };
    
    const strength = getStrength(password);
    
    const getColor = (strength) => {
        if (strength === 0) return "red-500";
        if (strength === 1) return "red-400";
        if (strength === 2) return "yellow-500";
        if (strength === 3) return "yellow-400";
        return "green-500";
    };

    const getStrengthText = (strength) => {
        if (strength === 0) return "Muy débil";
        if (strength === 1) return "Débil";
        if (strength === 2) return "Regular";
        if (strength === 3) return "Buena";
        return "Fuerte";
    };

    return (
        <div className='mt-2'>
            <div className='flex justify-between items-center mb-1'>
                <span className='text-xs text-gray-400'>Seguridad de la contraseña</span>
                <span className='text-xs text-gray-400'>{getStrengthText(strength)}</span>
            </div>

            <div className='flex space-x-1'>
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? `bg-${getColor(strength)}` : "bg-gray-600"} `}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    );
}

export default PasswordStrengthMeter
