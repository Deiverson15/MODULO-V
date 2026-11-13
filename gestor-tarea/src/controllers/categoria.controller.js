import { Categoria } from "../models/Categoria.js";

export const crearCategoria = async(req,res)=>{
    try {
        const {nombre,descripcion} = req.body

        if(!nombre || !descripcion){
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            })
        }

        const nuevaCategoria = await Categoria.create({nombre, descripcion})


        res.status(201).json({
            mensaje: "Se ha creado con exito la categoria",
            data:  nuevaCategoria
        })

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la categoría',
            error: error.message
        });
    }
}
