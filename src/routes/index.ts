import { Router } from 'express';
import rolesRoutes from './rolesRoutes';
import userRoutes from './usersRoutes';
import postRoutes from './postsRoutes';
import commentsRoutes from './commentsRoutes';
import likesRoutes from './likesRoutes';
import loginRoutes from './login';

const routes = Router();

routes.use('/login', loginRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/users', userRoutes);
routes.use('/posts', postRoutes);
routes.use('/comments', commentsRoutes);
routes.use('/likes', likesRoutes);

export default routes;
