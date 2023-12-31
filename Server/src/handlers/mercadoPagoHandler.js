require ("dotenv").config()
const {MercadoPagoConfig, Preference} = require("mercadopago")
const {ACCESS_TOKEN}=  process.env;

const client = new MercadoPagoConfig({
    accessToken: ACCESS_TOKEN
})

const payment= new Preference(client)

const createOrder = async (req, res) => {

    try {
        const cart = req.body

        let items = cart.map((product) => ({
            title: product.name,
            quantity: product.quantity,
            unit_price: parseInt (product.price),
            currency_id: "ARS",
            picture_url: product.image,
            description: product.description,
            colour: product.colour
          }));

        let preference = {
            body:{
                items: items,
                "back_urls": {
                    "success": "https://quirkzmain.vercel.app/success",
                    "failure": "https://quirkzmain.vercel.app",
                    "pending": ""
                },
                auto_return: "approved",
            }
        }

        const response = await payment.create(preference)
        console.log(response)

        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const successfulPurchase = (req, res) =>{
    try {
        const {payment_id} = req.query;

        console.log(req);
        res.status(200).send("Approved payment.")

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createOrder,
    successfulPurchase
}