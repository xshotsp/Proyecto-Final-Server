const { User, UserProduct, Product } = require("../db");
const cloudinary = require("cloudinary").v2;

const getUser = async (email) => {
  try {
    const user = await User.findByPk(email);
    return user;
  } catch (error) {
    console.error("Error when obtaining the user:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const updateUser = async (email, newData) => {
  try {
    const usertoUpdate = await User.findByPk(email);

    if (!usertoUpdate) {
      throw new Error(`User with email ${email} not found`);
    }

    let { profile_picture } = newData;

    // CLOUDINARY
    if (profile_picture) {
      const cloudinaryUpload = await cloudinary.uploader.upload(
        `${profile_picture}`
      );
      profile_picture = cloudinaryUpload.secure_url;
    }

    newData.profile_picture = profile_picture;
    await usertoUpdate.update(newData);

    return usertoUpdate;
  } catch (error) {
    throw error;
  }
};

const restoreUserById = async (id) => {
  try {
    const restoredUser = await User.findByPk(id);

    restoredUser.active = !restoredUser.active;
    await restoredUser.save();

    return restoredUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { getUser, getAllUsers, updateUser, restoreUserById };
