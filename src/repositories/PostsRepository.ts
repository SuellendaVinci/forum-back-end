import { Post } from './../models/Post';
import { AppDataSource } from '../configs/db';

const PostsRepository = AppDataSource.getRepository(Post).extend({});

export default PostsRepository;
