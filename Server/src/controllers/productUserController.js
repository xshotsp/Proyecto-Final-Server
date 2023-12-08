const { User, Product, UserProduct } = require("../db");

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
      const existingCartItem = await UserProduct.findOne({
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
      const cartItem = await UserProduct.create({
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
      const userProduct = await UserProduct.findOne({
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
      const relations = await UserProduct.findAll();
      return relations;
    } catch (error) {
      return error.message;
    }
  },

  // Actualizar la cantidad en una relación usuario-producto
  async updateRelation({ email, productId, quantity }) {
    try {
      // Verificar si la relación existe
      const relation = await UserProduct.findOne({
        where: {
          userEmail: email,
          productId: productId,
        },
      });

      if (!relation) {
        throw new Error("La relación no existe.");
      }

      // Actualizar la cantidad
      if (relation.quantity === 1 && !quantity) {
        await relation.destroy();
      } else if (quantity) {
        relation.quantity = quantity;
        await relation.save();
      } else {
        relation.quantity -= 1;
        await relation.save();
      }

      return relation;
    } catch (error) {
      return error.message;
    }
  },

  // Eliminar una relación usuario-producto
  async deleteRelation({ email }) {
    try {
      const result = await UserProduct.destroy({ where: { userEmail: email } });

      if (result === 0) {
        throw new Error(
          "No se encontraron relaciones usuario-producto para eliminar"
        );
      }

      return "Carrito borrado."
    } catch (error) {
      console.error(
        "Error al eliminar las relaciones usuario-producto:",
        error
      );
      throw new Error("Error interno del servidor");
    }
  },
};

module.exports = userProductController;
