import { Router } from 'express';
import postRoutes from './postsRoutes';
import rolesRoutes from './rolesRoutes';
import userRoutes from './usersRoutes';

const routes = Router();

routes.use('/roles', rolesRoutes);
routes.use('/users', userRoutes);
routes.use('/products', postRoutes);

export default routes;
