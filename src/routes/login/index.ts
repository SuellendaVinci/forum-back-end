import { Router } from 'express';
import UserDto from '../../dtos/userDto';
import LoginUseCase from '../../useCases/login';

const loginRoutes = Router();

loginRoutes.post('/', async (req, res) => {
  const { email, password } = req.body as Pick<UserDto, 'email' | 'password'>;

  const loginUseCase = new LoginUseCase();

  const response = await loginUseCase.execute({
    email,
    password,
  });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

export default loginRoutes;
