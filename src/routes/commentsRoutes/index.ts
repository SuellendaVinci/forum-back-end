import { Router } from 'express';
import CommentDto from '../../dtos/commentDto';
import CreateCommentUseCase from '../../useCases/comments/createComment';
import verifyUser from '../../services/verifyUser';

const commentsRoutes = Router();

commentsRoutes.post('/', async (req, res) => {
  const { message, postId } = req.body as CommentDto;

  const verifyUserResponse = await verifyUser(req.headers.authorization);

  if (verifyUserResponse.statusCode === 401) {
    const { statusCode, data } = verifyUserResponse;
    res.status(statusCode).send(data);
    return;
  }

  const createCommentUseCase = new CreateCommentUseCase();

  const response = await createCommentUseCase.execute({
    message,
    postId,
    userId: verifyUserResponse.data.userId,
  });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

export default commentsRoutes;
