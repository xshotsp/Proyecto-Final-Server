const {
  getUser,
  getAllUsers,
  updateUser,
  restoreUserById,
} = require("../controllers/userController");
const { User } = require("../db");
const transporter = require("../functions/sendMails");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const results = await getUser(email);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sortUsers = (array) => {
  return array.sort((a, b) => a.email.localeCompare(b.email));
};

const getAllUsersHandler = async (req, res) => {
  try {
    const response = await getAllUsers();
    const sortedUsers = await sortUsers(response);
    res.status(200).json(sortedUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUserHandler = async (req, res) => {
  try {
    const { email } = req.params;
    const newUser = await updateUser(email, req.body);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createUserHandler = async (req, res) => {
  try {
    const {
      name,
      lastname,
      password,
      email,
      profile_picture,
      phone,
      provider,
      admin,
      active,
    } = req.body;
    console.log(email);
    if (!email) {
      return res.status(400).json("Incomplete required fields.");
    }

    const searchEmail = await User.findAll({
      where: {
        email: email,
      },
    });

    if (searchEmail.length) {
      if (searchEmail[0].provider === "google") {
        return res
          .status(404)
          .json(
            "The user or email is already registered with a Google account."
          );
      }

      return res
        .status(404)
        .json("The user or email already exists.");
    } else {
      // para encriptar el password
      // const hashedPassword = await bcrypt.hash(password, 10);
      // password = hashedPassword;

      const newUser = await User.create({
        name,
        lastname,
        password,
        email,
        profile_picture,
        phone,
        provider,
        admin,
        active,
      });

      await transporter.sendMail({
        from: "Message sent by <quirkz41@gmail.com>",
        to: email,
        subject: "Welcome to QUIRKZ",
        html: ` 
        <p>Thank you for choosing our online store QUIRKZ</p>
        <p style="font-size: 16px; color: #0074d9;">
        To go to the page, click  <a href="https://quirkzmain.vercel.app" style="text-decoration: none; color: #ff4136; font-weight: bold;">Here</a>.
    </p>`,
      });

      return res.status(200).json(newUser);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const secretKey = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password) {
      throw new Error("Missing data.");
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("User not found.");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password.");
    }
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
    return res.json({
      access: true,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const restoreUserHandler = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await restoreUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserHandler,
  getAllUsersHandler,
  putUserHandler,
  createUserHandler,
  login,
  restoreUserHandler,
};
