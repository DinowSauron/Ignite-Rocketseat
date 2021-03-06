import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { FormEvent, useState } from "react";
import { useAuth } from "../services/contexts/AuthContext";
import styles from "../styles/home.module.scss"
import { withSSRGuest } from "../utils/withSSRGuest";


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data);
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>

      <button type="submit">Entrar</button>
    </form>
  )
}

// high order function
export const getServerSideProps = withSSRGuest<{}>( // pode omitir isso tbm <{ users: string[] }>
   async (ctx) => {

    return {
      props: {}
    }
  }
)