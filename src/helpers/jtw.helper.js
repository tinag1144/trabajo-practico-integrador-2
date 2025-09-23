import jwt from "jsonwebtoken";

//generar token al iniciar sesion
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRES 
    });
};

//verificar token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Error verifying token: " + error.message);
        
    }   
};