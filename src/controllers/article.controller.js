import { ArticleModel } from "../models/article.model.js";

export const createArticle = async (req, res) => {
    try {
        const author_Id = req.user.id
        const { title, content, excerpt, status, author, tags} = req.body;
        
        //validaciones,,,

        const newArticle = await ArticleModel.create({
            title,
            content,
            excerpt,
            status,
            author,
            tags 
        });

        res.status(201).json({
            ok: true, 
            msg: "Articulo creado"
        });

    } catch (error) {
        res.status(500).json({
            ok: false, 
            msg: "Error en el servidor"
        });
        // console.error(error)
    };
};

export const getArticles = async (req, res) => {
    try {
        const article = await ArticleModel.find().populate([
      {
        path: "comments",
        populate: {
          path: "author",
          model: "User",
          select: "-password",
        },
      },
    ]);
    return res.status(200).json(article);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        })
        console.log(error);
    }
};

export const getArticleById = async (req, res) => {
    try { 

        const { id } = req.params;
        const article = await ArticleModel.findById(id).populate([{
            path: "comments",
            populate: {
                path: "author",
                model: "User",
                select: "-password",
            },
        },
    ]);
    
    return res.status(200).json(article);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            okg: false,
            msg: "error en el server"
        })
    }
};

export const getMyArticles = async (req, res) => {
    try {
        const userId = req.user.id;

    const articles = await ArticleModel.find({ author: userId }).populate([
      {
        path: "comments",
        populate: {
          path: "author",
          model: "User",
          select: "-password",
        },
      },
    ]);


     return res.status(200).json(articles);

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error interno del servidor", error
        })
    }
};

export const updateArticles = async (req, res) => {
    try {
       const { id } = req.params;
       const { title, content, excerpt, status, tags } = req.body; 

       const article = await ArticleModel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        excerpt,
        status,
        tags,
      },
      { new: true }
    ).populate([
      {
        path: "comments",
        populate: {
          path: "author",
          model: "User",
          select: "-password",
        },
      },
    ]);
    return res.status(201).json({
      msg: "Articulo actualizado correctamente",
      data: article,
    });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        })
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
         const article = await ArticleModel.findOneAndDelete(id);

         return res.status(200).json({
            msg: "Articulo eliminado",
            data: article 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false, 
            msg: "Error en el servidor", 
            
        })
    }
};