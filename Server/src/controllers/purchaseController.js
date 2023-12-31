const { Purchase, User } = require("../db");
const transporter = require("../functions/sendMails");

const createPurchase = async (productData) => {
    console.log(productData)
      try {
        const { items, totalAmount, order, date, email, name, lastname } = productData;
       
               
        const newPurchase = await Purchase.create({
          items,
          totalAmount,
          order,
          date
        });
    
        //crea la asociacion entre compra y usuario
        //await newPurchase.setUser(email);
        await newPurchase.setUser(email);

        //envia correo //
        await transporter.sendMail({
            from: "message sended for <quirkz41@gmail.com>",
            to: email,
            subject: "Information QUIRKZ Buy Order",
            html: ` 
            <h3>User</h3>
            <h3>${email}</h3>
            <h2>Order: ${order} </h2>
            <h3>Date: ${date} </h3>
            <h3>Total: $${totalAmount}</h3>
            <h3>Currency: COP</h3>
            <h3>Status: Paid</h3>
            <p style="font-size: 16px; color: #0074d9;">
          For going to web page, do click <a href="https://quirkzmain.vercel.app/" style="text-decoration: none; color: #ff4136; font-weight: bold;">here</a>.
        </p>`,
          });
    
        return newPurchase;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    const getPurchaseByEmail = async (email) => {
      const purchaseDB = await Purchase.findAll({where: {userEmail: email}})
      return purchaseDB;
    };

    const getAllPurchase = async () => {
      const purchaseDB = await Purchase.findAll();
      return purchaseDB;
    };

    module.exports = {createPurchase, getPurchaseByEmail, getAllPurchase}