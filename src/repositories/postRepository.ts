import { AppDataSource } from "../configs/db";
import { Post } from "../models/Post";

const PostsRepository = AppDataSource.getRepository(Post).extend({});

export default PostsRepository;