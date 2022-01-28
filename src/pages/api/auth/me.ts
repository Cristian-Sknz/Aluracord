import type { NextApiRequest, NextApiResponse } from 'next';
import Jwt from 'jsonwebtoken';

const TOKEN_TYPE = 'Bearer';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorization: token } = req.headers;
  if (token && token.startsWith(TOKEN_TYPE)) {
    const decoded = Jwt.verify(
      token.substring(TOKEN_TYPE.length + 1),
      process.env.APPLICATION_SECRET
    );
    res.status(200).json(decoded);
    return;
  }
  res.status(401).json({
    message: 'Você precisa estar logado para ter essas informações!',
  });
}

export default handler;