import { Router } from 'express';
import PostDto from '../../dtos/postDto';
import CreatePostUseCase from '../../useCases/posts/createPost';
import jwt from 'jsonwebtoken';
import verifyUser from '../../services/verifyUser';

const postRoutes = Router();

postRoutes.post('/', async (req, res) => {
  const { message } = req.body as PostDto;

  const verifyUserResponse = await verifyUser(req.headers.authorization);

  if (verifyUserResponse.statusCode === 401) {
    const { statusCode, data } = verifyUserResponse;
    res.status(statusCode).send(data);
    return;
  }

  const createPostUseCase = new CreatePostUseCase();

  const response = await createPostUseCase.execute({
    message,
    userId: verifyUserResponse.data.userId,
  });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

export default postRoutes;
