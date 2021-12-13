import Link from "next/link";
import { useEffect } from "react";
import { Can } from "../components/Can";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { useAuth } from "../services/contexts/AuthContext"
import styles from "../styles/dashboard.module.scss"
import { withSSRAuth } from "../utils/withSSRAuth";


export default function Dashboard() {

  const { user, signOut } = useAuth();


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
          

          <Can permissions={["metrics.list"]}>
            <p>E-mail: {user?.email}</p>
            <p>Permições: {listItens(user?.permissions)}</p>
            <p>Cargos: {listItens(user?.roles)}</p>
            
          </Can>
        </>

      ) : (
        <>
          <h1>You Need Login</h1>
          <button onClick={signOut} className={styles.backButton}>Go To Login Page</button>
        </>
      )}

      <button onClick={signOut} className={styles.backButton}>Sign Out</button>
      
    </div>
  )
}


// com isso essa rota só será acessada se estiver autenticado!
// nada do componente é enviado ao usuario !
export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/me")//.catch(err => console.log)
 
  

  return {
    props: {}
  }
})