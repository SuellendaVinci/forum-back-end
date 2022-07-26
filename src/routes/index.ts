import { Router } from 'express';
import rolesRoutes from './rolesRoutes';
import userRoutes from './usersRoutes';

const routes = Router();

routes.use('/roles', rolesRoutes);
routes.use('/users', userRoutes);

export default routes;
