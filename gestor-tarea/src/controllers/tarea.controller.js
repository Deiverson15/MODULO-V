import {Tarea} from '../models/Tarea.js'


export const crearTarea = async (req,res) =>{

    try {
        const {titulo,descripcion,categoria, fecha_fin} = req.body

        if(!titulo || !descripcion || !categoria){
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            })
        }

        if (fecha_fin) {
            if (isNaN(Date.parse(fecha_fin))) {
                return res.status(400).json({
                    mensaje: 'La fecha de fin no tiene un formato válido'
                });
            }

            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            const fechaFinDate = new Date(fecha_fin);
            fechaFinDate.setHours(0, 0, 0, 0);

            if (fechaFinDate < hoy) {
                return res.status(400).json({
                    mensaje: 'La fecha de fin no puede estar en el pasado'
                });
            }
        }


        const nuevaTarea = await Tarea.create({titulo,descripcion,categoria, fecha_fin, completado: false})

        res.status(201).json({
            mensaje: "Nueva tarea registrada con exito",
            data: nuevaTarea
    })
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear la nueva tarea",
            error: error.message
        })
    }
}

export const obtenerTareasInCompletas = async (req, res) => {
    try {
        const buscarTareas = await Tarea.find({completado: false})

        res.status(200).json({
            mensaje: "Busqueda exitosa...",
            data: buscarTareas,
            total: buscarTareas.length
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al encontrar la tarea",
            error: error.message
        })
    }
}

export const obtenerTareasCompletas = async (req, res) => {
    try {
        const buscarTareas = await Tarea.find({completado: true})

        res.status(200).json({
            mensaje: "Busqueda exitosa...",
            data: buscarTareas,
            total: buscarTareas.length
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al encontrar la tarea",
            error: error.message
        })
    }
}

export const obtenerTareasPorCategoria = async (req,res) =>{

    try {
        const {categoria} = req.params;

        const obtenerCategoria = await Tarea.find({categoria});

        if(obtenerCategoria.length === 0){
            return res.status(404).json({
                mensaje: "No hay tareas encontradas en esa categoria",
                totales: obtenerCategoria.length
            });
        }else{
            res.status(200).json({
                mensaje: "Busqueda Exitosa",
                data: obtenerCategoria,
                totales: obtenerCategoria.length
            })
        }
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al encontrar la tarea",
            error: error.message
        })
    }
    
}

export const actualizarTarea = async (req,res) =>{
    try {
        const {id} = req.params

        const {titulo, descripcion, categoria,fecha_fin } = req.body;
                
        const encontrarTarea = await Tarea.findById(id)
        
        if(!encontrarTarea){
            return res.status(404).json({
                mensaje: "No existe tarea con el id a consultar"
            });
        };

        if (fecha_fin) {
            if (isNaN(Date.parse(fecha_fin))) {
                return res.status(400).json({
                    mensaje: 'La fecha de fin no tiene un formato válido'
                });
            };

            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            const fechaFinDate = new Date(fecha_fin);
            fechaFinDate.setHours(0, 0, 0, 0);

            if (fechaFinDate < hoy) {
                return res.status(400).json({
                    mensaje: 'La fecha de fin no puede estar en el pasado'
                });
            };
        };

        encontrarTarea.titulo = titulo || encontrarTarea.titulo
        encontrarTarea.descripcion = descripcion || encontrarTarea.descripcion
        encontrarTarea.categoria = categoria || encontrarTarea.categoria
        encontrarTarea.fecha_fin = fecha_fin || encontrarTarea.fecha_fin

        const nuevaTarea = await encontrarTarea.save()

        res.status(200).json({
            mensaje: 'Tarea actualizada exitosamente',
            tarea: nuevaTarea
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la tarea',
            error: error.message
        });
    }
}

export const completarTarea = async(req,res) =>{
    try {
        const {id} = req.params;
    
        const buscarTarea = await Tarea.findById(id);

        if(!buscarTarea){
            return res.status(404).json({
                mensaje: "No se existe esta tarea"
            });
        }


        if(buscarTarea.completado){
            return res.status(400).json({
                mensaje: "Esta tarea fue previamente completada"
            })
        }

        buscarTarea.completado = true;

        const guardarTarea = await buscarTarea.save();


        res.status(200).json({
            mensaje: "Tarea actualizada con exito",
            data: guardarTarea
        })
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al completar la tarea',
            error: error.message
        });
    }
    
}

export const eliminarTarea = async(req,res) =>{

    try {
        const {id} = req.params;

        const buscarTarea = await Tarea.findById(id);

        if(!buscarTarea){
            return res.status(404).json({
                mensaje: "No se encontro la tarea"
            })
        }

        if(buscarTarea.fecha_eliminacion){
            return res.status(400).json({
                mensaje: "Ya la tarea fue eliminada previamente"
            })
        }

        buscarTarea.fecha_eliminacion = new Date();

        const tareaEliminada = await buscarTarea.save();

        res.status(200).json({
            mensaje: "Tarea eliminada con exito",
            data: tareaEliminada
        })
    
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la tarea',
            error: error.message
        });
    }

}