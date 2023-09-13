import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

export const validateAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
  const apiHeader = req.headers.apikey;
  if (!apiHeader) {
    res.status(401).send('APIKEY in header missing');
    return;
  }
  // store the APIKEY in .env or Keyvault, add inline for dev purpose
  else if (apiHeader === process.env.APIKEY){
    next();
  }
  else{
    res.status(401).send('Invalid APIKEY');
    return;
  }

  } catch (err) {
    res.status(401).send('Invalid APIKEY');
  }
};
