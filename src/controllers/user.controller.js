import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";
import { UserModel } from "../models/user.model.js";

export const getUsers = async (req, res)=> {
    try {
        const users = await UserModel.find().populate("articles")

        res.status(200).json({ 
            ok: true,
            data: users
        }); 

    } catch (error) {
        res.status(500).json({
            ok: false, 
            msg: "Error en el servidor", error
        });
        console.error(error)
    };
};

export const getUserArticlesAndComments = async (req, res) => {
    try {
        const user_Id = await req.params.id;
        const user = await UserModel.findById(user_Id).select( "-password -__v")

        //traer articulos 
        const articulos = await ArticleModel.find( { author: user_Id });

        //traer comentarios 
        const comentarios = await CommentModel.find( { author: user_Id });

        res.json({
            ok: true,
            user,
            articulos,
            comentarios
        });


    } catch (error) {
        res.status(500).json({
            ok: false, 
            msg: "Error en el servidor", error
        });
    };
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json({
        ok: true,
        msg: "Usuario actualizado con exito "
    });

  } catch (error) {
    res.status(400).json({ 
        ok: false,
        msg: "Error en el servidor", error
     });
  }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id)

        res.status(200).json({
            ok: true,
            msg: "Usuario eliminado con exito"
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error en el servidor", error
        })
    }
}