import styles from "./styles.module.scss"
import { signIn, useSession } from "next-auth/react"
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import { useRouter } from "next/router";


export function SubscribeButton() {
  const session = useSession().data;
  const router = useRouter();

  async function HandleSubscribe() {
    if(!session) {
      signIn("github");
      return;
    }

    if(session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({sessionId});
    }catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={HandleSubscribe}
    >
      Subscribe Now
    </button>
  )
}
