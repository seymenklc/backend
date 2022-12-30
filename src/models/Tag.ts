import mongooseHidden from 'mongoose-hidden';
import mongoose, { Schema, model } from 'mongoose';
import { slugify } from '@/helpers/index';

const tagSchema = new Schema({
   name: String,
   slug: String,
});

tagSchema.set("toJSON", { virtuals: true });
tagSchema.plugin(mongooseHidden());

// create a from name slug before saving the tag
tagSchema.pre('save', function (next) {
   this.slug = slugify(this.name as string);
   next();
});

export default mongoose.models.Tag || model('Tag', tagSchema);