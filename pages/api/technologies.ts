// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {technologies} from "@/pages/api/data/technologies";
import {ITechnologies} from "@/model";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ITechnologies>
) {
  res.status(200).json(technologies)
}
