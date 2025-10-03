import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
    try {
        const { name, description } = req.body
        const newTag = await TagModel.create({
            name,
            description
        });

        return res.status(200).json({
            ok: true, 
            msg: "Etiqueta creada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error en el server"
        })
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await TagModel.find();
        
        return res.status(200).json({
            ok: true,
            tags
        });

    } catch (error) {
        return res.status(500).json({
            ok: false, 
            msg: "Error en el servidor"
        })
    }
};

export const getTagById = async (req, res) => {
    try {
        const { id } = req.params
        const tag = await TagModel.findById(id);

        if (!tag) return res.status(404).json({
            msg: "No se encontró la etiqueta con el id proporcionado"
        });

        return res.status(200).json({
            tag
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        })
    }
};

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description} = req.body;
        const newTag = await TagModel.findByIdAndUpdate(id, {
            name, 
            description
        },
        { new: true });
        
        return res.status(200).json({
            msg: "Etiqueta actualizada correctamente",
            data: newTag
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error en el servidor"
        })
    }
};

export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTag = await TagModel.findByIdAndDelete(id);

        return res.status(200).json({
            msg: "Etiqueta eliminada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            ok: false, 
            msg: "Error en el servidor"
        })
    }
};