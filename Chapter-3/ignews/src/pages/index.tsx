import Head from "next/head"
import React from "react"
import { GetStaticProps } from "next"
import { SubscribeButton } from "../components/SubscribeButton"
import styles from "../styles/home.module.scss"
import { stripe } from "../services/stripe"
import { SessionProvider } from "next-auth/react"

type HomeProps = {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <> 
      <Head>
        <title>ig.news | Home</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton/>
        </section>

        <img src="./images/avatar.svg" alt="girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(
    "price_1K34QoEZdq7NzU87eM20zZWJ", 
    { expand: ["product"] } // mostrar nome, descrição, etc
  );

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 3600 * 24 // 24 hours
  }
}