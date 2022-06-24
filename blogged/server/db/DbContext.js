import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BlogSchema } from '../models/Blog';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Blog = mongoose.model('Blog', BlogSchema)
}

export const dbContext = new DbContext()
