export const adminMiddleware = (req, res, next) => {
    try {
        const role = req.user.role;
        if (role !== 'admin') {
            return res.status(403).json({ message: "Solo los administradores tienen acceso." });
        }
        next();
        
} catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};