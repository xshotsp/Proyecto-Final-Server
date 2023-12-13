const { User } = require("./db");

const createAdmin = async () => {
  await User.findOrCreate({
    where: { email: "admin@quirkz.com" },
    defaults: {
      name: "Admin",
      lastname: "Admin",
      password: "Admin123",
      profile_picture:
        "https://static.vecteezy.com/system/resources/previews/000/290/610/non_2x/administration-vector-icon.jpg",
      provider: "form",
      admin: true,
      active: true,
    },
  });
};

module.exports = {
  createAdmin,
};
