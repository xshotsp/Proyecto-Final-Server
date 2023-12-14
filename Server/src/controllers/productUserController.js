const { where } = require("sequelize");
const { User, Product, UserProduct } = require("../db");

const userProductController = {
  async createRelation({ email, products }) {
    try {
      // Verificar si el usuario existe
      const user = await User.findByPk(email);

      if (!user) {
        throw new Error("User not found.");
      }

      // Convertir a array si solo se proporciona un producto
      const productsArray = Array.isArray(products) ? products : [products];

      // Obtener la lista de IDs de productos
      const productIds = productsArray.map((product) => product.productId);

      // Obtener la lista de productos existentes en la base de datos
      const existingCartItems = await UserProduct.findAll({
        where: {
          userEmail: email,
          productId: productIds,
        },
      });

      const existingCartItemsMap = existingCartItems.reduce((map, item) => {
        map[item.productId] = item;
        return map;
      }, {});

      // Iterar sobre la lista de productos proporcionada
      for (const { productId, quantity } of productsArray) {
        // Verificar si el producto ya existe en el carrito del usuario
        const existingCartItem = existingCartItemsMap[productId];

        if (existingCartItem) {
          // Si ya existe, puedes actualizar la cantidad o manejarlo según tus necesidades
          existingCartItem.quantity += quantity;
          await existingCartItem.save();
        } else {
          // Crear el carrito item y asociarlo al usuario y al producto
          await UserProduct.create({
            quantity,
            userEmail: email,
            productId: productId,
          });
        }
      }

      return "Connections created successfully.";
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
        throw new Error("Connection does not exist.");
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

  // Eliminar relación usuario-producto
  async deleteRelation({ email, productsId }) {
    try {
      if(email && !productsId){
        await UserProduct.destroy({where:{userEmail:email}})
        return "Deleted shopping cart.";
      }
      const deletionPromises = productsId.map((itemId) => {
        return UserProduct.destroy({
          where: {
            userEmail: email,
            productId: itemId,
          },
        });
      });

      await Promise.all(deletionPromises);

      return "Deleted shopping cart.";
    } catch (error) {
      console.error("Failed to delete user-product connections.", error);
      throw new Error("Error internal server.");
    }
  },

  async getAllProductsUser({ email }) {
    try {
      const user = await User.findOne({
        where: { email: email },
        include: "products",
      });

      if (user === 0) {
        throw new Error("The user has no products in their shopping cart.");
      }

      return user;
    } catch (error) {
      console.error("Failed to delete user-product relationships", error);
      throw new Error("Error internal server.");
    }
  },
};

module.exports = userProductController;
