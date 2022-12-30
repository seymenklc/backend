import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Tag from '@/models/Tag';

const getTags = async (req: Request, res: Response) => {
   try {
      const tags = await Tag.find();
      return res.status(200).json({ data: tags });
   } catch (error) {
      return res.status(400).json({ error: 'Something went wrong' });
   }
};

const getTagById = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ error: 'Invalid ID' });
      }

      const tag = await Tag.findById(id);
      return res.status(200).json({ tag });
   } catch (error) {
      return res.status(400).json({ error: 'Something went wrong' });
   }
};

// this will not be used on the frontend
const createTag = async (req: Request, res: Response) => {
   try {
      const tag = await Tag.create(req.body);
      return res.status(200).json({ data: tag });
   } catch (error) {
      return res.status(400).json({ error: 'Something went wrong' });
   }
};

export default { getTags, createTag, getTagById };