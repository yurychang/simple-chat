import jwt from 'jsonwebtoken';

const expireTime = 60 * 60 * 24 * 30; // 30 days

export function generateJwtToken({
  userId,
  username,
}: {
  userId: string | number;
  username: string;
}) {
  const payload = {
    userId,
    username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expireTime,
  };

  return jwt.sign(payload, process.env.JWT_SECRET!);
}
