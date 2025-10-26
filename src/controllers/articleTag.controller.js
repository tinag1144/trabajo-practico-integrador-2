import { ArticleModel } from "../models/article.model.js";
import { TagModel } from "../models/tag.model.js";

//añadir etiqueta a un articulo
export const addTagToArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;
    const article = await ArticleModel.findById(articleId);
    const tag = await TagModel.findById(tagId);

    if (!article || !tag) {
      return res.status(404).json({
        ok: false,
        msg: "Artículo o etiqueta no encontrado",
      });
    }

    if (article.tags.includes(tagId)) {
      return res.status(400).json({
        ok: false,
        msg: "La etiqueta ya está asociada a este artículo",
      });
    }

    //$push agrega el ID del tag al array "tags" del artículo
    await ArticleModel.findByIdAndUpdate(articleId, {
      $push: { 
        tags: tagId 
    },
    });

    // $push agrega el ID del artículo al array "articles" del tag
    await TagModel.findByIdAndUpdate(tagId, {
      $push: { 
        articles: articleId 
    },
    });

    return res.status(200).json({
      ok: true,
      msg: "Etiqueta agregada al artículo correctamente",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al agregar etiqueta al artículo",
    });
  }
};

// Sacar une etiqueta de un articulo
export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleId, tagId } = req.params;
    const article = await ArticleModel.findById(articleId);
    const tag = await TagModel.findById(tagId);

    if (!article || !tag) {
      return res.status(404).json({
        ok: false,
        msg: "Artículo o etiqueta no encontrado",
      });
    }

    //$pull elimina el ID del tag del array "tags" en el artículo
    await ArticleModel.findByIdAndUpdate(articleId, {
      $pull: { 
        tags: tagId 
    },
    });

    //$pull elimina el ID del artículo del array "articles" en el tag
    await TagModel.findByIdAndUpdate(tagId, {
      $pull: { 
        articles: articleId 
    },
    });

    return res.status(200).json({
      ok: true,
      msg: "Etiqueta removida del artículo correctamente",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el server",
    });
  }
};
