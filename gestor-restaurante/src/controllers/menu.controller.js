import Menu from '../models/Menu.js';
import Categoria from "../models/Categoria.js";
import mongoose from 'mongoose';

export const obtenerMenu = async (req, res) => { 
    try {
        const consulta = await Menu.find({fecha_eliminado: null}).populate('categoria','nombre')
        res.status(200).json({
            mensaje:"Menu obtenido con exito",
            data: consulta
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha podido obtener el menu",
            error: error.message
        })
    }
}

export const obtenerMenuPorId = async (req, res) => { 

    try {
        const {id} = req.params;

        const obtenerIdMenu = await Menu.findById(id).populate('categoria', 'nombre');

        if(!obtenerIdMenu){
            return res.status(404).json({
                mensaje: "Sin existencia en el menu"
            }) 
        } else{
                res.status(200).json({
                    mensaje: "Encontrado en el menu",
                    data: obtenerIdMenu,
                    total: obtenerIdMenu.length
                })
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha encontrodado el menu",
            error: error.message
        })
    }
    
}

export const crearMenu = async (req, res) => {

    try {
        const {nombre,precio, categoria} = req.body

        if(!nombre || precio == undefined || precio == null && !categoria || precio < 0){
            return res.status(400).json({
                mensaje: "Error al crear menu campos no validos"
            })
        }

        const categoriaExiste = await Categoria.findById(categoria);

        if (!categoriaExiste || categoriaExiste.fecha_eliminacion) {
            return res.status(400).json({
                mensaje: 'Error de negocio: La categoría proporcionada no existe'
            });
        }

        const menuNuevo = await Menu.create({nombre, categoria, precio})

        res.status(201).json({
            mensaje: "Menu creado con exito",
            data: menuNuevo
        })

    } catch (error) {
        res.status(500).json({
        mensaje: 'Error al crear el ítem del menú',
        error: error.message
    });
    }
    
}

export const actualizarMenu = async (req, res) => { 
    try {
        const {id} = req.params
        const {nombre,precio, categoria} = req.body;

        if(precio !== undefined && precio < 0){
            return res.status(400).json({
                mensaje: "Error el precio no puede ser negativo"
            })
        }

        const menu = await Menu.findById(id)

        if(!menu){
            return res.status(404).json({
                mensaje: "No se ha encontrado el item del menu"
            })
        }


        if (categoria && categoria.toString() !== menu.categoria.toString()) {
            if (!mongoose.Types.ObjectId.isValid(categoria)) {
                return res.status(400).json({ 
                    ok: false, 
                    msg: 'El ID de la categoría no es válido' 
                });
            }

            const categoriaExiste = await Categoria.findById(categoria);
                if (!categoriaExiste) {
                    return res.status(400).json({ 
                    ok: false, 
                    msg: 'La categoría especificada no existe' 
                });
            }
        }

        menu.nombre = nombre || menu.nombre;
        menu.categoria = categoria || menu.categoria;
        precio !== undefined ? precio : menu.precio

        const actualizar = await menu.save();

        res.status(200).json({
            mensaje: "Se ha actualizado el menu exitosamente",
            data: actualizar
        })
        
    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha encontrodado el menu",
            error: error.message
        })
    }
}

export const desactivarMenu = async (req, res) => { 
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id);

        if(!id){
            return res.status(404).json({
                mensaje: "No se ha encontrado el id"
            })
        }

        menu.disponible = false;
        const guardar = await menu.save();

        res.status(200).json({
            mensaje: "Se ha desactivado el menu",
            data: guardar
        })

    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha podido desactivar el menu",
            error: error.message
        })
    }
}

export const activarMenu = async (req, res) => { 
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id);

        if(!id){
            return res.status(404).json({
                mensaje: "No se ha encontrado el id"
            })
        }

        menu.disponible = true

        const activar = await menu.save();

        res.status(200).json({
            mensaje: "Se ha activado el menu",
            data: activar
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha podido activar el menu",
            error: error.message
        })
    }
}

export const eliminarMenu = async (req, res) => { 
    try {
        const { id } = req.params;
        
        const menu = await Menu.findById(id);
        if(!id){
            return res.status(404).json({
                mensaje: "No se ha encontrado el id"
            })
        }

        if (menu.fecha_eliminado) {
            return res.status(400).json({
                mensaje: 'El menú ya fue eliminado previamente'
            });
        }

        menu.fecha_eliminado = new Date();
        const menuEliminado = await menu.save();

        res.status(200).json({
            mensaje: 'El menú ha sido eliminado con éxito',
            data: menuEliminado
        });
        
    } catch (error) {
        res.status(500).json({
            mensaje: "No se ha podido eliminar el menu",
            error: error.message
        })
    }
}