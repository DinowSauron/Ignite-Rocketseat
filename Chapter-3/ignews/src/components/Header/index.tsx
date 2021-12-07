import React from "react"
import { SignInButton } from "../SignInButton"
import styles from "./styles.module.scss"
import Link from "next/link"
import { ActiveLink } from "../ActiveLink"

export function Header() {

  

  return (
    <header className={styles.headercontainer}>
      <div className={styles.HeaderContent}>
        <img src="/images/logo.svg" alt="ig.news"/>
        
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            Home
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            Posts
          </ActiveLink>
        </nav>

        <SignInButton/>
      </div>
    </header>
  )
}
