import bcrypt from "bcrypt";

//hashear contraseña al registrarse
export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

//comparar contraseña de inicio de sesion y a guardada en la bd
export const comparePasswords = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};