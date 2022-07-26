import { Repository } from 'typeorm';
import { Like } from '../../models/Like';
import { User } from '../../models/User';
import { Comment } from '../../models/Comment';
import LikesRepository from '../../repositories/likesRepository';
import UsersRepository from '../../repositories/usersRepository';
import CommentsRepository from '../../repositories/commentsRepository';
import LikeDto from '../../dtos/likeDto';

import HttpResponseDto from '../../dtos/httpResponseDto';

export default class CreateLikeUseCase {
  private _likesRepository: Repository<Like>;
  private _commentsRepository: Repository<Comment>;
  private _usersRepository: Repository<User>;

  constructor() {
    this._likesRepository = LikesRepository;
    this._commentsRepository = CommentsRepository;
    this._usersRepository = UsersRepository;
  }

  public async execute({
    userId,
    commentId,
  }: Omit<LikeDto, 'id'>): Promise<HttpResponseDto | null> {
    const like = new Like();

    const user = await this._usersRepository.findOne({
      where: { id: userId },
    });

    const comment = await this._commentsRepository.findOne({
      where: { id: commentId },
    });

    like.user = user;
    like.comment = comment;

    const response = await this._likesRepository
      .save(like)
      .then((): HttpResponseDto<Like> => {
        return { statusCode: 201, data: like };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    return response;
  }
}
