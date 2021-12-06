import { NextApiRequest, NextApiResponse} from "next"

export default async function GetUsers(req: NextApiRequest, res: NextApiResponse) {
  //serverless (não roda 24hrs)

  const users = [
    {id: 1, name: "luiz"},
    {id: 2, name: "lucas"},
    {id: 3, name: "alina"},
    {id: 4, name: "jonh"},
  ]

  return res.json(users);
}