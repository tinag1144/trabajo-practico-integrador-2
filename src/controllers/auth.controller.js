import { generateToken, verifyToken } from "../helpers/jtw.helper.js";
import { hashPassword, comparePasswords } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/user.model.js";

//crear un usuario y perfil (registro)
export const register = async (req, res) => {
    try {
        const { username, email, password, role, profile } = req.body;
        const hashedPassword = await hashPassword(password);

        const newRegister = await UserModel.create({
            username,  
            email, 
            password: hashedPassword,
            role,
            profile
        });

        res.status(201).json({
            ok: true,
            msg: "Usuario y perfil creados"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error en el servidor", error
        })
    }
};

//login 
export const login = async (req, res) => {
    try {
        const { username, password} = req.body;
        const user = await UserModel.findOne( { $or: [{username}] } );
        const hashPass = await comparePasswords(password, user.password);

        if (!user || !hashPass) {   
            return res.status(401).json({ 
                ok: false,
                msg: "Credenciales invalidas"
            });
        }

        const token = generateToken( {
            id: user.id,
            username: user.username,
            role: user.role
        });

        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: 60 * 60 * 100
        });

        return res.status(200).json({ 
            ok: true,
            msg: "Inicio de sesión exitoso"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error en el servidor", error
        })
        console.error(error);
    }
};

//logout 
export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        ok: true,
        msg: "Se cerró la sesión"
    })
};