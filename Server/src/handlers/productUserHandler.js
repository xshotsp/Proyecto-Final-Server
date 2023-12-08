const { createRelation, getAllRelations,getRelation ,updateRelation, deleteRelation } = require("../controllers/productUserController");

const createRelationHandler = async (req, res) => {
  try {
    const response = await createRelation(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRelationHandler = async(req,res)=>{
  const {userId, productId} = req.query
  try {
    if(userEmail,productId){
      const response = await getRelation(userEmail,productId);
      return res.status(200).json(response);
    }
    const allRelations = await getAllRelations()
    return res.status(200).json(allRelations)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateRelationHandler = async(req,res)=>{
  console.log(req.body)
  try {
    const response = await updateRelation(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteRelationHandler = async(req,res)=>{
  try {
    const response = await deleteRelation(req.params);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports={
  createRelationHandler,
  getRelationHandler,
  updateRelationHandler,
  deleteRelationHandler
}