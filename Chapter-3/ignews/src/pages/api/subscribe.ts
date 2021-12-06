

import { NextApiRequest, NextApiResponse} from "next";
import { getSession } from "next-auth/react";
import { fauna, q} from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string;
  }
}

export default async function GetUsers(req: NextApiRequest, res: NextApiResponse) {
  

  if(req.method === "POST") {

    const session = await getSession({ // servidor tem acesso aos cookies, por isso recupera o valor (req.cookies)
      req
    });

    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index("user_by_email"),
          q.Casefold(session.user.email)
        )
      )
    )

    let customerId = user.data.stripe_customer_id;

    if(!customerId) { // se não existir um consumidor, salva no banco 

      const stripeCustomer =  await stripe.customers.create({
        email: session.user.email,
        // metadata
      });

      await fauna.query(
        q.Update(
          q.Ref(q.Collection("users"), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id
            }
          }
        )
      );

      customerId = stripeCustomer.id
    }



    // console.log(stripeCustomer)

    const stripeChekoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {price: "price_1K34QoEZdq7NzU87eM20zZWJ", quantity: 1 }
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return res.status(200).json({sessionId: stripeChekoutSession.id})
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }

}
