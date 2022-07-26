import { Router } from 'express';
import PostDto from '../../dtos/postDto';
import CreatePostUseCase from '../../useCases/posts/createPost';

const postRoutes = Router();

postRoutes.post('/', async (req, res) => {
  const { message, userId } = req.body as PostDto;

  const createPostUseCase = new CreatePostUseCase();

  const response = await createPostUseCase.execute({
    message,
    userId,
  });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

export default postRoutes;
