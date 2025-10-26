import { CommentModel } from "../models/comment.model.js";
import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";


//crear comentario en articulo 

export const createComment = async (req, res) => {
  try {
    const { content, article } = req.body;
    const author = req.user.id; 
    const newComment = await CommentModel.create({
      content,
      author,
      article,
    });

    //findByIdAndUpdate + $push busca el artículo por ID y agrega el ID del nuevo comentario al array "comments"
    await ArticleModel.findByIdAndUpdate(article, {
      $push: { comments: newComment._id }, // $push añade un elemento a un array sin borrar los anteriores
    });

    return res.status(201).json({
      ok: true,
      msg: "Comentario creado correctamente",
      data: newComment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear comentario",
    });
  }
};

//listar comentarios de unarticulo 
export const getCommentsFromArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await CommentModel.find({ article: articleId }).populate({
      path: "author",
      model: UserModel, 
      select: "-password", 
    });

    return res.status(200).json({
      ok: true,
      msg: "Comentarios del artículo",
      data: comments,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};

//listar comentarios del usuario logueado
export const getMyComments = async (req, res) => {
  try {
    const userId = req.user.id;

    const comments = await CommentModel.find({ author: userId }).populate({
      path: "article",
      model: ArticleModel,
      select: "title",
    });

    return res.status(200).json({
      ok: true,
      data: comments,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }
};


//actualizar comentario
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await CommentModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        ok: false,
        msg: "Comentario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Comentario actualizado correctamente",
      data: updatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el server",
    });
  }
};


//eliminar comentario 
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await CommentModel.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({
        ok: false,
        msg: "Comentario no encontrado",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Comentario eliminado correctamente",
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Error en el server",
    });
  }
};
