import { Router } from 'express';
import CommentDto from '../../dtos/commentDto';
import CreateCommentUseCase from '../../useCases/comments/createComment';
import UpdateCommentUseCase from '../../useCases/comments/updateComment';
import DeleteCommentUseCase from '../../useCases/comments/deleteComment';
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

commentsRoutes.put('/:id', async (req, res) => {
  const { message } = req.body as CommentDto;
  const { id } = req.params;

  const verifyUserResponse = await verifyUser(req.headers.authorization);

  if (verifyUserResponse.statusCode === 401) {
    const { statusCode, data } = verifyUserResponse;
    res.status(statusCode).send(data);
    return;
  }

  const updateCommentUseCase = new UpdateCommentUseCase();

  const response = await updateCommentUseCase.execute({
    id: Number(id),
    message,
    userId: verifyUserResponse.data.userId,
  });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

commentsRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const verifyUserResponse = await verifyUser(req.headers.authorization);

  if (verifyUserResponse.statusCode === 401) {
    const { statusCode, data } = verifyUserResponse;
    res.status(statusCode).send(data);
    return;
  }

  const deleteCommentUseCase = new DeleteCommentUseCase();

  const response = await deleteCommentUseCase.execute({
    id: Number(id),
    userId: verifyUserResponse.data.userId,
  });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

export default commentsRoutes;
