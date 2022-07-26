import { Like } from './../models/Like';
import { AppDataSource } from '../configs/db';

const LikesRepository = AppDataSource.getRepository(Like).extend({});

export default LikesRepository;
