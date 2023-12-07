const { createRelation } = require("../controllers/productUserController");

const createRelationHandler = async (req, res) => {
  const {userId,productId,quantity} = req.body
  console.log(req.body)
  try {
    const response = await createRelation(userId,productId,quantity);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports={
  createRelationHandler
}