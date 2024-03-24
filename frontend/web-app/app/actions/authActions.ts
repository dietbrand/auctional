import { getServerSession } from 'next-auth';
import { cookies, headers } from 'next/headers';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '../api/auth/[...nextauth]/nextauthOptions';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session) return null;

    return session.user;
  } catch (error) {
    return null;
  }
};

export const getTokenAlt = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map(c => [c.name, c.value])
    ),
  } as NextApiRequest;

  return await getToken({ req });
};
