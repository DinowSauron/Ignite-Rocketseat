import Stripe from "stripe" //stripe do backend

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: "2020-08-27",
    appInfo: {
      name: "ignews",
      version: "0.1.0",
    }
  }
)
// não enviar nenhuma informação desta para o front-end