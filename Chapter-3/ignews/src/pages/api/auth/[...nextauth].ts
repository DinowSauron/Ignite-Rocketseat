import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna, q } from "../../../services/fauna"

/*
  await fauna.query(
    q.Create(                      // FQL - Fauna Query Language
      q.Collection("users"),       // nome da tabela
      { data: {email: params.user.email} }               // salva o email em users
    )
  )
*/

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      
      // authorization: "https://github.com/login/oauth/authorize?scope=read:user+user:avatar" 
    })
    // ...add more providers here
  ],

  jwt: {
    secret: process.env.HASH_KEY
  },
  secret: process.env.HASH_KEY,

  callbacks: {
    async session({session}) {
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_user_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(session.user.email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index("subscription_by_status"),
                "active"
              )
            ])
          )
        )

        return {
          ...session,
          activeSubscription: userActiveSubscription
        }
      } catch(err) {
        return {
          ...session,
          activeSubscription: null,
          subscriptionError: err.message
        }
      }
    },

    async signIn(params) {
      //console.log(params) //params.profile -> pega os dados da api do github
      const user = params.user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(                             // FQL - Fauna Query Language
              q.Collection("users"),             // nome da tabela
              { data: { email: user.email} }    // salva o email em users
            ), //q.Update...
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(user.email)
              )
            )
          )
        )
  
        return true

      } catch {
        return false
      }
    }
  }
})
 