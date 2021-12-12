import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "../services/contexts/AuthContext"
import styles from "../styles/dashboard.module.scss"


export default function Dashboard() {

  const { user } = useAuth();

  useEffect(() => {
    api.get("/me")
      .then(console.log)
      .catch(console.log)
  }, [])

  function listItens(itens) {
    if(!itens) {
      return;
    }
    return itens.map(item => (
      <span key={item}>{item} </span>
    ))
  }



  return (
    <div className={styles.container}>
      {user ? (
        <>
          <h1>You are Logged</h1>
          
          <p>E-mail: {user?.email}</p>
          <p>Permições: {listItens(user?.permissions)}</p>
          <p>Cargos: {listItens(user?.roles)}</p>
        </>

      ) : (
        <>
        <h1>You Need Login</h1>
        <Link href="/">
          <a>Go To Login Page</a>
        </Link>
        </>

      )}

      <Link href="/">
        <a className={styles.backButton}>Return</a>
      </Link>
    </div>
  )
}

