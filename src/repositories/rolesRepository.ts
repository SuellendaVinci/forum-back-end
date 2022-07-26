import { Role } from '../models/Role';
import { AppDataSource } from '../configs/db';

const RolesRepository = AppDataSource.getRepository(Role).extend({});

export default RolesRepository;
