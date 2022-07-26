import { Router } from 'express';
import RoleDto from '../../dtos/roleDto';
import CreateRoleUseCase from '../../useCases/roles/createRole';

const rolesRoutes = Router();

rolesRoutes.post('/', async (req, res) => {
  const { name } = req.body as RoleDto;

  const createRoleUseCase = new CreateRoleUseCase();

  const response = await createRoleUseCase.execute({ name });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

export default rolesRoutes;
