import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
// models
import User from '@/models/User';
// helpers
import { errorHandler, generateToken } from '@/helpers/index';

const register = async (req: Request, res: Response) => {
   try {
      const user = await User.create(req.body);

      const token = generateToken(user.id);

      res.set('Set-Cookie', cookie.serialize('token', token, {
         httpOnly: false,
         secure: process.env.NODE_ENV !== 'development',
         maxAge: 86400000,
         sameSite: 'none',
         path: '/'
      }));

      return res.status(201).json({ user: user.id, success: true });
   } catch (error) {
      return res.status(400).json({ errors: errorHandler(error) });
   }
};

const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;

   try {
      if (!email || !password) {
         return res.status(400).json({ error: 'Please enter all fields' });
      }

      const user = await User.findOne({ email });

      if (user) {
         const match = await bcrypt.compare(password, user.password);

         if (!match) {
            return res.status(400).json({ error: 'Password is incorrect' });
         }

         const token = generateToken(user.id);

         res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'none',
            maxAge: 86400000,
            path: '/'
         }));

         return res.status(200).json({ user: user.id, success: true });
      }

      return res.status(400).json({ error: 'Email is incorrect' });
   } catch (error) {
      return res.status(400).json({ errors: errorHandler(error) });
   }
};

const logout = async (req: Request, res: Response) => {
   res.set('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'none',
      path: '/'
   }));

   return res.status(200).json({ success: true });
};

const me = (req: Request, res: Response) => {
   const { user } = res.locals;

   return res.status(200).json({
      user: {
         email: user.email,
         username: user.username,
      }
   });
};

export default { register, login, logout, me };