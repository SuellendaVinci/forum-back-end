import { Comment } from '../models/Comment';
import { AppDataSource } from '../configs/db';

const CommentsRepository = AppDataSource.getRepository(Comment).extend({});

export default CommentsRepository;
