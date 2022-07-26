import { User } from '../models/User';
import { AppDataSource } from '../configs/db';

const UsersRepository = AppDataSource.getRepository(User).extend({});

export default UsersRepository;
