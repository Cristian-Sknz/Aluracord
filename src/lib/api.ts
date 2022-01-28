
async function signIn(name: string) {
  const options: RequestInit  = ({
    method: 'POST',
    body: JSON.stringify({
      username: name,
    }),
  });
  return await fetch('/api/auth/login', options);
}

async function getUser(token: string) {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  return await fetch('/api/auth/me', { headers });
}

export { signIn, getUser};