import { ArticleModel } from "../models/article.model.js";
import { CommentModel } from "../models/comment.model.js";


//dueño del articulo
export const ownerMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const user = req.user.id; 
        
         const owner = await ArticleModel.findOne({
        id: id,
        author: user,
      });

      if (!owner) {
        return res.status(403).json({
            ok: false,
            msg: "No tenes permisos para este articulo",
        });
      }
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: "Error en el servidor", error
        });
    };
};

//autor del comentario
export const authorMiddleware = async (req, res, next) => {
    try {
        const comentario = await CommentModel.findByPk(req.params.id);
        const author = await req.user.id;

        if ( author !== comentario.author_id) {
            return res.status(403).json({ 
                ok: false,
                msg: "Usted no es autor de este comentario"
            })
        }

        next();
    } catch (error) {
        res.status(500).json({
            ok: false, 
            msg: "Error en el servidor", error
        });
    };
};

