import User from '@/models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.cookies.token;
      if (!token) throw new Error('Unauthorized');

      const result = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await User.findById(result.id);
      if (!user) throw new Error('Unauthorized');

      // add user to res.locals
      res.locals.user = user;

      return next();
   } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
         console.log(error.message);
      }
      return res.status(401).json({ error: { message: 'Unauthorized' } });
   }
};