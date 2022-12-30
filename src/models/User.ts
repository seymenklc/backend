import bcrypt from 'bcrypt';
import validator from 'validator';
import mongooseHidden from 'mongoose-hidden';
import { Schema, model, Model } from 'mongoose';

interface IUser {
   id: string;
   email: string;
   username: string;
   password: string;
}

interface UserModel extends Model<IUser> {
   login: (email: string, password: string) => IUser;
}

const userSchema = new Schema<IUser, UserModel>({
   email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
   },
   username: {
      type: String,
      required: [true, 'Please enter an username'],
      unique: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: [true, 'Please enter an password'],
      minlength: [6, 'Minimum password length is 6 characters'],
   },
});

// This will add `id` in toJSON
userSchema.set("toJSON", { virtuals: true });

// This will remove `_id` and `__v` 
userSchema.plugin(mongooseHidden());

// Hash password before saving to db
userSchema.pre('save', async function (next) {
   try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
      next();
   } catch (error: any) {
      next(error);
   }
});

// create a method to log in user by comparing password
// userSchema.statics.login = async function (email, password) {
//    try {
//       const user = await this.findOne({ email });

//       if (user) {
//          const match = await bcrypt.compare(password, user.password);

//          if (!match) throw new Error('Password is incorrect');

//          return user;
//       }

//       throw Error('Email is incorrect');
//    } catch (error) {
//       throw error;
//    }
// };

export default model<IUser, UserModel>('User', userSchema);