import { verifyToken } from '../helpers/jtw.helper.js';

//autenticación de token 
export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies["token"]; 
        if (!token) {
            return res.status(401).json({ message: "Token no autenticado" });
        }; 
        const decoded = verifyToken(token, process.env.JWT_SECRET); 
        req.user = decoded; 

        next(); 

    } catch (error) { 
        console.error("Error en el servidor:", error);
        
    }
};