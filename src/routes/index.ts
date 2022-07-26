import { Router } from 'express';
import rolesRoutes from './rolesRoutes';

const routes = Router();

routes.use('/roles', rolesRoutes);

export default routes;
