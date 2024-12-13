import crypto from 'crypto';
import { RequestHandler } from 'express';
import hashingPassword from '../utils/hashingPassword.js';

const hashPassword: RequestHandler = (req, res, next) => {
  if (!req.body.password) next();

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashingPassword(req.body.password, salt);

  req.body.password = hash;
  req.body.salt = salt;

  next();
};

export default hashPassword;
