import { Router } from 'express';
import rolesRoutes from './rolesRoutes';
import userRoutes from './usersRoutes';
import postRoutes from './postsRoutes';

const routes = Router();

routes.use('/roles', rolesRoutes);
routes.use('/users', userRoutes);
routes.use('/posts', postRoutes);

export default routes;
