import { Router } from 'express';
import LikeDto from '../../dtos/likeDto';
import CreateLikeUseCase from '../../useCases/likes/createLike';
import verifyUser from '../../services/verifyUser';

const likesRoutes = Router();

likesRoutes.post('/', async (req, res) => {
  const { commentId } = req.body as LikeDto;

  const verifyUserResponse = await verifyUser(req.headers.authorization);

  if (verifyUserResponse.statusCode === 401) {
    const { statusCode, data } = verifyUserResponse;
    res.status(statusCode).send(data);
    return;
  }

  const createLikeUseCase = new CreateLikeUseCase();

  const response = await createLikeUseCase.execute({
    commentId,
    userId: verifyUserResponse.data.userId,
  });

  const { statusCode, data } = response;

  res.status(statusCode).send(data);
});

export default likesRoutes;
