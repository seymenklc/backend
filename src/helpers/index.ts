import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
   return jwt.sign({ id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN!
   });
};

export const errorHandler = (err: any) => {
   let errors: any = {};

   if (String(err).includes('Email is incorrect')) {
      errors.email = 'Email is incorrect';
   }

   if (String(err).includes('Password is incorrect')) {
      errors.password = 'Password is incorrect';
   }

   if (err.code === 11000) {
      errors.email = 'Email already exists';
      return errors;
   }

   if (err.message.includes('User validation failed')) {
      Object.values(err.errors).forEach(({ properties }: any) => {
         errors[properties.path] = properties.message;
      });
   }

   return errors;
};

// https://gist.github.com/codeguy/6684588#gistcomment-2759673
export const slugify = (str: string) => {
   str = str.trim();
   str = str.toLowerCase();

   // remove accents, swap ñ for n, etc
   const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
   const to = 'aaaaaaeeeeiiiioooouuuunc------';

   for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
   }

   return str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
      .replace(/^-+/, '') // trim - from start of text
      .replace(/-+$/, '') // trim - from end of text
      .replace(/-/g, '-');
};
