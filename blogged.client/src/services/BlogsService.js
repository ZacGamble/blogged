import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class BlogsService{
    async getBlogs(){
      const res = await api.get('api/blogs')
      AppState.blogs = res.data;
      logger.log(res.data)
    }
}

export const blogsService = new BlogsService()