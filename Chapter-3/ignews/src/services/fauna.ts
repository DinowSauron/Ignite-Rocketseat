import { Client, query } from "faunadb"


export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
  domain: 'db.us.fauna.com' // caso cão crie como classic
});

export const q = query;