import Pedido from '../models/Pedido.js';
import Menu from '../models/Menu.js';

const ESTADOS_VALIDOS = [
  'PENDIENTE',
  'EN_PREPARACION',
  'LISTO',
  'ENTREGADO',
  'CANCELADO'
];


export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ fecha_eliminacion: null }).populate(
      'menus',
      'nombre precio'
    );

    return res.status(200).json({
      mensaje: 'Consulta exitosa',
      total: pedidos.length,
      pedidos
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener los pedidos',
      error: error.message
    });
  }
};


export const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate(
      'menus',
      'nombre precio'
    );

    if (!pedido) {
      return res.status(404).json({
        mensaje: 'Pedido no encontrado.'
      });
    }

    return res.status(200).json({
      mensaje: 'Pedido encontrado.',
      pedido
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al obtener el pedido',
      error: error.message
    });
  }
};


export const crearPedido = async (req, res) => {
  try {
    const { menus, observaciones } = req.body;

    if (!menus || menus.length === 0) {
      return res.status(400).json({
        mensaje: 'El pedido debe contener menus (IDs de menú).'
      });
    }

    // Buscar todos los ítems únicos de menú
    const uniqueMenuIds = [...new Set(menus.map((id) => id.toString()))];
    const menuItems = await Menu.find({
      _id: { $in: uniqueMenuIds },
      fecha_eliminado: null
    });

    if (menuItems.length !== uniqueMenuIds.length) {
      return res.status(400).json({
        mensaje: 'Uno o más IDs de menú proporcionados no son válidos o no existen.'
      });
    }

    // Validar que todos los platos solicitados estén disponibles
    const noDisponibles = menuItems.filter((item) => !item.disponible);
    if (noDisponibles.length > 0) {
      return res.status(400).json({
        mensaje: 'Uno o más platos seleccionados no están disponibles actualmente.'
      });
    }

    // Contar cantidades por cada ID y calcular el total
    const menuCounts = menus.reduce((acc, id) => {
      const key = id.toString();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    let pedidoTotal = 0;
    for (const menu of menuItems) {
      const cantidad = menuCounts[menu._id.toString()];
      if (cantidad) {
        pedidoTotal += menu.precio * cantidad;
      }
    }

    const pedidoCreado = await Pedido.create({
      menus,
      total: pedidoTotal,
      observaciones
    });

    const pedidoPoblado = await Pedido.findById(pedidoCreado._id).populate(
      'menus',
      'nombre precio'
    );

    return res.status(201).json({
      mensaje: 'Pedido creado con éxito.',
      pedido: pedidoPoblado
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al crear el pedido',
      error: error.message
    });
  }
};


export const actualizarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado || !ESTADOS_VALIDOS.includes(estado)) {
      return res.status(400).json({
        mensaje: `Estado inválido. Use uno de: ${ESTADOS_VALIDOS.join(', ')}`
      });
    }

    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!pedidoActualizado) {
      return res.status(404).json({
        mensaje: 'Pedido no encontrado.'
      });
    }

    return res.status(200).json({
      mensaje: 'Pedido actualizado con éxito.',
      pedido: pedidoActualizado
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al actualizar el estado del pedido',
      error: error.message
    });
  }
};


export const eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);

    if (!pedido) {
      return res.status(404).json({
        mensaje: 'Pedido no encontrado.'
      });
    }

    if (pedido.fecha_eliminacion) {
      return res.status(409).json({
        mensaje: 'El pedido ya se encuentra eliminado.'
      });
    }

    pedido.fecha_eliminacion = new Date();
    await pedido.save();

    return res.status(200).json({
      mensaje: 'Pedido ha sido eliminado.',
      id: req.params.id,
      fecha_eliminacion: pedido.fecha_eliminacion
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Error al eliminar el pedido',
      error: error.message
    });
  }
};