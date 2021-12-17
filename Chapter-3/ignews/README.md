# IG.News

* cd Chapter-3/ignews x2
  * ``yarn dev``
  * ``yarn stripe listen --forward-to localhost:3000/api/webhooks``
  * Copie o codigo do signin secret do webhook e coloque no .env.local



* yarn create next-app 'name'

* yarn add typescript @types/react @types/node -D

* yarn add sass

* yarn add react-icons

* yarn add stripe - backend
* yarn add @stripe/stripe-js - front-end
* .env.local 
  ```
  STRIPE_API_KEY=
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY='public key
  STRIPE_SUCCESS_URL=http://localhost:3000/posts
  STRIPE_CANCEL_URL=http://localhost:3000/

  WEBHOOK_SIGNIN_SECRET='yarn stripe code'
  PRISMIC_ACCESS_TOKEN=
  PRISMIC_ENTRY_POINT=https://PRISMIC_NAME/api/v2

  GITHUB_CLIENT_ID=
  GITHUB_CLIENT_SECRET=

  FAUNADB_KEY=

  HASH_KEY='any string -> md5 hask key recomended'
  NEXTAUTH_URL=http://localhost:3000/api/auth/
  DISABLE_MOCKED_WARNING=true
  ```


* Chamadas API:
  * Client-Side (useEffect) -> chamadas no lado do cliente.
  * Server-Side (getServerSide) -> chamadas dinâmicas pelo lado do servidor.
  * Static-Site Generation (getStatic) -> compartilha o html com todos que acessam a aplicação no lado do servidor.


  * Post do blog
  * Conteudos (SSG)
  * Comentários (Client-side)

* yarn add next-auth
* yarn add @types/next-auth

* yarn add faunadb - configure o banco no site do faunadb

* yarn add axios

* yarn add @prismicio/client prismic-reactjs next-slicezone
* yarn add prismic-dom @types/prismic-dom - formata os dados para uma versão dom


### webhooks stripe:

* Configure o endpoint no stripe `https://dashboard.stripe.com/test/webhooks`

#### Developer (localhost)
* instalar por .exe `https://stripe.com/docs/stripe-cli?shell=true` | metodo usado
* execute o stripe em ./stripe.exe [command]
  * para facilitar foi criado um script no packge.json, então execute ``yarn stripe [command]`` apenas.
* Utilizar o CLI Online, faça o login

#### Stripe Comand Line (Development):
  * yarn stripe -h
  * yarn stripe listen --forward-to localhost:3000/api/auth/webhooks -> deixe rodando durante as transações com cartão para disparar os eventos
  * 

---


## Chapter 5 - Testes unitários:

### Comandos adicionais:

* cd Chapter-3/ignews   - x2
  * ``yarn dev``
  * ``yarn stripe listen --forward-to localhost:3000/api/webhooks``
* yarn add jest @testing-library/jest-dom @testing-library/jest-dom @testing-library/react babel-jest -D 
* yarn add ts-jest -D
* yarn jest

* yarn add identity-obj-proxy -D -> arquivos de estilos 'next'