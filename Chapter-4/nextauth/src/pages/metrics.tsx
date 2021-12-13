import { decode } from "punycode";
import { useEffect } from "react";
import { Can } from "../components/Can";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { signOut, useAuth } from "../services/contexts/AuthContext"
import styles from "../styles/dashboard.module.scss"
import { withSSRAuth } from "../utils/withSSRAuth";


export default function Metrics() {


  return (
    <div className={styles.container}>
        
      <h1>You can see this page!</h1>
      

      <Can permissions={["metrics.list"]}>
        Metric.
      </Can>

      <button onClick={signOut} className={styles.backButton}>Return</button>
    </div>
  )
}


export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/me");

 
  return {
    props: {}
  }
}, {
  permissions: ["metrics.list"],
  roles: ["administrator", "editor"]
})