import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BlogSchema } from '../models/Blog';
import { CommentSchema } from '../models/Comment';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Blogs = mongoose.model('Blog', BlogSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
