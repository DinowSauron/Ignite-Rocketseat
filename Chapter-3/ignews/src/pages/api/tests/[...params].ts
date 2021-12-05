import { NextApiRequest, NextApiResponse} from "next"

export default function GetUsers(req: NextApiRequest, res: NextApiResponse) {

  const data = req.query

  return res.json(data)
}