import { Router } from "express";
import postRoutes from "./post.routes";

const routes = Router();

routes.use('/products', postRoutes);

export default routes;