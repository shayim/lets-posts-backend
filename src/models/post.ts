import { Schema, Model, model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
}

export const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
});

export const PostModel: Model<IPost> = model("Post", PostSchema);
