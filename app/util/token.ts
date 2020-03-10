import jwt from "jsonwebtoken";

const security = process.env.SECRET_KEY || "Temp";

export const tokenGenerator = (uid: number, account: string): string => {
  return jwt.sign({ uid, account }, security || "Temp", {
    expiresIn: 60
  });
};

export const tokenVerifier = (token: string): boolean => {
  try {
    jwt.verify(token, security);
    return true;
  } catch (error) {
    return false;
  }
};
