import { UserModel } from "../models/user.model.js";

//traer el perfil del usuario autenticado
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await UserModel.findById(userId).select( "profile" )

         if (!profile) {
            return res.status(404).json({
                ok: false,
                msg: "Perfil no encontrado"
            });
        }

        res.json({
            ok: true,
            profile
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error en el server", error
        });
        // console.error(error)
    };
};

//actualizar profile
export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, biography, avatarURL, birthDate } = req.body
        
        //buscar y actualizar el perfil

        const profile = await UserModel.findByIdAndUpdate(req.user.id, {
            //acá uso dot notation (veo el objeto profile, busco dentro de el lo que quiero actualizar y le doy un nuevo valor)
            "profile.firstName": firstName,
            "profile.lastName": lastName,
            "profile.biography": biography,
            "profile.avatarURL": avatarURL,
            "profile.birthDate": birthDate
        }, {
            new: true
        }).select("-password -__v")

        //validar si el perfil existe 
        if (!profile) return res.status(404).json({ 
            ok: false, 
            msg: "El perfil no se encuentra registrado"
        });


        res.status(200).json({
            ok: true,
            msg: "Perfil actualizado con éxito", profile
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error en el servidor", error
        });
        console.error(error)
    }
};
