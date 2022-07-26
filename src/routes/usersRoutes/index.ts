import { Router } from 'express';
import UserDto from '../../dtos/userDto';
import CreateUserUseCase from '../../useCases/users/createUser';

const userRoutes = Router();

userRoutes.post('/', async (req, res) => {
  const { name, email, password, gender, ocupation, city, roleId } =
    req.body as UserDto;

  const createUserUseCase = new CreateUserUseCase();

  const response = await createUserUseCase.execute({
    name,
    email,
    password,
    gender,
    ocupation,
    city,
    roleId,
  });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

export default userRoutes;
