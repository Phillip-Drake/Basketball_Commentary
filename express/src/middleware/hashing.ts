import argon2 from "argon2";
import { NextFunction, Request, Response } from "express";

export async function hashPasswordMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body.password) {
      const hashedPassword = await argon2.hash(req.body.password);
      req.body.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
}

export async function verifyPasswordMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body.password && req.body.hashedPassword) {
      const isPasswordValid = await argon2.verify(
        req.body.hashedPassword,
        req.body.password
      );
      if (!isPasswordValid) {
        res.status(401).send({ error: "Invalid password" });
        return;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
}
