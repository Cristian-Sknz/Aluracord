import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from 'src/lib/supabase';
import Jwt from 'jsonwebtoken';
import { GithubUser } from '@contexts/types';

const TOKEN_EXPIRES = 7200; // 2 hours

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (methodNotAllowed(req.method, res)) {
    return;
  }
  if (isBadCredentials(req.body, res)) {
    return;
  }

  fetch(`https://api.github.com/users/${JSON.parse(req.body).username}`).then(
    async (response) => {
      if (response.status == 401) {
        res.status(429).json({
          message: 'Limite de requisições da API alcançado, tente mais tarde!',
        });
        return;
      }
      if (response.status == 404) {
        res.status(response.status).json({
          message: 'Este usuario não foi encontrado.',
        });
        return;
      } 

      const user = createUserObject(await response.json());
      const database = supabase.from<GithubUser>('users');
      database.upsert(user).then((payload) => {
        handleJWTResponse(payload.data[0], res);
      });
    });
}

function handleJWTResponse(user: GithubUser, res: NextApiResponse) {
  const token = Jwt.sign(user, process.env.APPLICATION_SECRET, {
    expiresIn: TOKEN_EXPIRES, // 2 hours
  });

  res.status(200).json({
    token_type: 'Bearer',
    token,
    expires: TOKEN_EXPIRES,
  });
}

function createUserObject(json: any): GithubUser {
  return {
    name: json.name,
    id: json.id,
    username: json.login,
    bio: json.bio,
    createdAt: json['created_at'],
    followers: json.followers,
    following: json.following,
    location: json.location,
    publicRepos: json['public_repos'],
  };
}

function methodNotAllowed(method: string, res: NextApiResponse<any>): boolean {
  if (method !== 'POST') {
    res.status(405).json({
      message: 'Method Not-Allowed',
    });
    return true;
  }
  return false;
}

function isBadCredentials(body: any, res: NextApiResponse<any>) {
  if (!JSON.parse(body).username) {
    res.status(401).json({
      message: 'Verifique suas credencias, elas estão incorretas.',
    });
    return true;
  }
  return false;
}

export default handler;
