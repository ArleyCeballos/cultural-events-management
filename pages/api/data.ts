// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Responsabilidades } from './datos'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse< typeof Responsabilidades>
) {
  res.status(200).json({...Responsabilidades})
}

