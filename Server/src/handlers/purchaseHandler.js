const { createPurchase, getPurchaseByEmail, getAllPurchase} = require("../controllers/purchaseController");

const createPurchaseHandler = async (req, res) => {
    try {
    
      const product = await createPurchase(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };

  const purchaseByUserHandler = async (req, res) => {
    const {email} = req.params;
    try {
      
      const response = await getPurchaseByEmail(email);
      res.status(200).send(response);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const purchaseHandler = async (req, res) => {
   
    try {
      
      const response = await getAllPurchase();
      res.status(200).send(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  module.exports = {
    createPurchaseHandler, purchaseByUserHandler, purchaseHandler
  };