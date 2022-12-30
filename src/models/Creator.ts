import { Schema, model } from 'mongoose';
import mongooseHidden from 'mongoose-hidden';

const creatorSchema = new Schema({
   name: String,
   title: String,
   image: String,
   available: Boolean,
   tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

creatorSchema.set("toJSON", { virtuals: true });
creatorSchema.plugin(mongooseHidden());

export default model('Creator', creatorSchema);