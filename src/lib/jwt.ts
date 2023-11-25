import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "1h",
  algorithm: "HS256",
};

export const signJwtAccessToken = (
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS
) => {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
};

export const verifyJwtAccessToken = (token: string) => {
  try {
    const secret_key = process.env.SECRET_KEY;
    const payload = jwt.verify(token, secret_key!);
    return payload as JwtPayload;
  } catch (err) {
    console.error(err);
    return null;
  }
};
