import jwt from "jsonwebtoken";
import config from "config";

const private_key = config.get<string>("private_key")

export function signJwt(
  object: Object, 
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>("private_key"),
    "base64"
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
) {
  const public_key = Buffer.from(config.get<string>("publik_key"), "base64").toString(
    "ascii"
  );

  try {
    const decoded = jwt.verify(token, public_key);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}