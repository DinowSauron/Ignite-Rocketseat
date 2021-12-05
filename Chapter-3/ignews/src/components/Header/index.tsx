import React from "react"
import { SignInButton } from "../SignInButton"
import styles from "./styles.module.scss"


export function Header() {

  return (
    <header className={styles.headercontainer}>
      <div className={styles.HeaderContent}>
        <img src="./images/logo.svg" alt="ig.news" />
        
        <nav>
          <a href="" className={styles.active}>Home</a>
          <a href="" >Posts</a>
        </nav>

        <SignInButton/>
      </div>
    </header>
  )
}