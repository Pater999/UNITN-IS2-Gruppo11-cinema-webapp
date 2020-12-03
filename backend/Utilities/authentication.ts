import jwt from 'jsonwebtoken';

import express from 'express';

// Costanti
const expireTime = '20d';
const issuer = 'https://smartcinema.it';

const validateTokenAdmin = (req: any, res: express.Response, next: express.NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  let result;
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: expireTime,
      issuer: issuer
    };
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!, options) as any;
      if (payload && payload.role === 'admin') next();
      else {
        result = {
          error: `Forbidden. You are not an admin.`,
          status: 403
        };
        res.status(403).send(result);
      }
    } catch (err) {
      result = {
        error: `Authentication error. Token invalid.`,
        status: 401
      };
      res.status(401).send(result);
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401
    };
    res.status(401).send(result);
  }
};

const validateTokenUser = (req: any, res: express.Response, next: express.NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  let result;
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]; // Bearer <token>
    const options = {
      expiresIn: expireTime,
      issuer: issuer
    };
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!, options) as any;
      res.locals.username = payload.username;
      next();
    } catch (err) {
      result = {
        error: `Authentication error. Token invalid.`,
        status: 401
      };
      res.status(401).send(result);
    }
  } else {
    result = {
      error: `Authentication error. Token required.`,
      status: 401
    };
    res.status(401).send(result);
  }
};

const createToken = (username: string, role: string) => {
  const payload = { username: username, role: role };
  const options = { expiresIn: expireTime, issuer: issuer };
  const secret = process.env.JWT_SECRET!;
  return jwt.sign(payload, secret, options);
};

export { validateTokenAdmin, validateTokenUser, createToken };
