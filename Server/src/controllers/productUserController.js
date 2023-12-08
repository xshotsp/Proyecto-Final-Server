const { User, Product, CartItem } = require("../db");

const userProductController = {
  async createRelation({ email, productId, quantity }) {
    try {
      // Verificar si el usuario y el producto existen
      const user = await User.findByPk(email);
      const product = await Product.findByPk(productId);

      if (!user || !product) {
        throw new Error("Usuario o producto no encontrado");
      }

      // Verificar si ya existe un CartItem para el usuario y el producto
      const existingCartItem = await CartItem.findOne({
        where: {
          userEmail: email,
          productId: productId,
        },
      });
      if (existingCartItem) {
        // Si ya existe, puedes actualizar la cantidad o manejarlo según tus necesidades
        existingCartItem.quantity += quantity;
        await existingCartItem.save();

        // Devolver la relación existente
        return existingCartItem;
      }

      // Crear el carrito item y asociarlo al usuario y al producto
      const cartItem = await CartItem.create({
        quantity,
        userEmail: email, // Aquí utilizamos la clave primaria del usuario como identificador
        productId: productId,
      });

      // Devolver la relación existente
      return cartItem;
    } catch (error) {
      return error.message;
    }
  },

  async getRelation(userEmail, productId) {
    try {
      const userProduct = await User_Product.findOne({
        where: {
          userEmail: userEmail,
          productId: productId,
        },
      });
      if (userProduct.dataValues.userEmail) return userProduct.dataValues;

      throw new Error("No existe relacion.");
    } catch (error) {
      return error.message;
    }
  },

  // Obtener todas las relaciones usuario-producto
  async getAllRelations() {
    try {
      const relations = await User_Product.findAll();
      return relations;
    } catch (error) {
      return error.message;
    }
  },

  // Actualizar la cantidad en una relación usuario-producto
  async updateRelation({ userEmail, productId, quantity }) {
    try {
      // Verificar si la relación existe
      const relation = await User_Product.findOne({
        where: {
          userEmail: userEmail,
          productId: productId,
        },
      });

      if (!relation) {
        throw new Error("La relación no existe.");
      }

      // Actualizar la cantidad
      relation.quantity = quantity || relation.quantity;
      await relation.save();

      return relation;
    } catch (error) {
      return error.message;
    }
  },

  // Eliminar una relación usuario-producto
  async deleteRelation(req, res) {
    try {
      const { relacionId } = req.params;

      // Verificar si la relación existe
      const relacion = await User_Product.findByPk(relacionId);

      if (!relacion) {
        return res
          .status(404)
          .json({ mensaje: "Relación usuario-producto no encontrada" });
      }

      // Eliminar la relación
      await relacion.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar la relación usuario-producto:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  },
};

module.exports = userProductController;
