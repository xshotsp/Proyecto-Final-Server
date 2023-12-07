const {User, Product,User_Product} = require("../db")

const userProductController = {
  // Crear una nueva relación usuario-producto
  async createRelation(userId,productId,quantity) {
   /*  console.log(userId,productId,quantity) */
    try {

      // Verificar si el usuario y el producto existen
      const user = await User.findByPk(userId);
      const product = await Product.findByPk(productId);

      if (!user || !product) {
        return 'Usuario o producto no encontrado'
      }

      // Crear la relación usuario-producto
      const newRelation = await User_Product.create({
        userId: userId,
        productId: productId,
        quantity: quantity || 1, // Puedes establecer un valor predeterminado si no se proporciona la cantidad
      });

      return newRelation
    } catch (error) {
      console.error('Error al crear la relación usuario-producto:', error);
      return 'Error interno del servidor'
    }
  },

  // Obtener todas las relaciones usuario-producto
  async getAllRelations(req, res) {
    try {
      const relations = await User_Product.findAll();
      return res.status(200).json(relations);
    } catch (error) {
      console.error('Error al obtener las relaciones usuario-producto:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  // Actualizar la cantidad en una relación usuario-producto
  async updateRelation(req, res) {
    try {
      const { relacionId, cantidad } = req.body;

      // Verificar si la relación existe
      const relacion = await User_Product.findByPk(relacionId);

      if (!relacion) {
        return res.status(404).json({ mensaje: 'Relación usuario-producto no encontrada' });
      }

      // Actualizar la cantidad
      relacion.cantidad = cantidad || relacion.cantidad;
      await relacion.save();

      return res.status(200).json(relacion);
    } catch (error) {
      console.error('Error al actualizar la relación usuario-producto:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },

  // Eliminar una relación usuario-producto
  async deleteRelation(req, res) {
    try {
      const { relacionId } = req.params;

      // Verificar si la relación existe
      const relacion = await User_Product.findByPk(relacionId);

      if (!relacion) {
        return res.status(404).json({ mensaje: 'Relación usuario-producto no encontrada' });
      }

      // Eliminar la relación
      await relacion.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar la relación usuario-producto:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  },
};

module.exports = userProductController;
