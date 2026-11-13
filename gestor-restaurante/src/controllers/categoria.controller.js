import Categoria from "../models/Categoria.js";

export const crearCategoria = async (req, res) => {
    try {
        const {nombre, descripcion} = req.body

        if(!nombre){
            return res.status(400).json({
                mensaje: "El nombre es obligatorio"
            });
        }

        const nuevaCategoria = await Categoria.create({
            nombre, descripcion
        })

        res.status(201).json({
            mensaje: "Se ha creado la categoria con exito",
            categoria: nuevaCategoria 
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha podido crear la categoria",
            error: error.message
        })
    }
}

export const obtenerCategorias = async (req, res) => { 
    try {
        const categorias = await Categoria.find({fecha_eliminacion: null})

        res.status(200).json({
            mensaje: "Resultado obtenido con exito",
            data:categorias,
            total: categorias.length
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha podido obtener las categorias",
            error: error.message
        })
    }
}

export const eliminarCategoria = async (req, res) => { 
    try {
        const {id} = req.params;

        const buscar = await Categoria.findById(id);

        if (!buscar) {
            return res.status(404).json({
                mensaje: 'No se encontró la categoría'
            });
        }

        if(buscar.fecha_eliminacion){
            return res.status(404).json({
                mensaje: "Esta categoria ya fue eliminada"
            })
        }

        buscar.fecha_eliminacion = new Date();
        const categoriaAEliminar = await buscar.save();


        res.status(200).json({
            mensaje: "Se ha elimado con exito la categoria",
            data: categoriaAEliminar,
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha podido eliminar la categoria",
            error: error.message
        })
    }
}