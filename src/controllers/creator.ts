import { Request, Response } from "express";
import Creator from "@/models/Creator";
import Tag from "@/models/Tag";

export const getCreators = async (req: Request, res: Response) => {
   const tag = req.query.tag as string;

   try {
      let query = Creator.find(tag.length ? { tags: tag } : {});

      const page = parseInt(req.query.p as string) || 1;
      const pageSize = parseInt(req.query.s as string) || 6;
      const skip = (page - 1) * pageSize;
      const total = await Creator.countDocuments();
      const totalPages = Math.ceil(total / pageSize);

      query = query.skip(skip).limit(pageSize).populate('tags');
      const response = await query;

      return res.status(200).json({
         success: true,
         data: {
            page,
            totalPages,
            count: response.length,
            creators: response,
         }
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         error: 'Server Error',
      });
   }
};

// this will not be used on the frontend nor the backend and is only for 
// seeding the database will be removed later
export const createCreator = async (req: Request, res: Response) => {
   const data = req.body.creators;
   const tags = await (await Tag.find()).filter(tag => tag.name != 'All');

   for (let i = 0; i < data.length; i++) {
      data[i].tags = [tags[Math.floor(Math.random() * tags.length)]._id];
   }

   for (let i = 0; i < data.length; i++) {
      data[i].tags = [...data[i].tags, tags[Math.floor(Math.random() * tags.length)]._id];
   }

   for (let i = 0; i < data.length; i++) {
      if (data[i].tags[0] === data[i].tags[1]) {
         data[i].tags = [data[i].tags[0], tags[Math.floor(Math.random() * tags.length)]._id];
      }
   }

   await Creator.insertMany(data);
};

export default { getCreators, createCreator };