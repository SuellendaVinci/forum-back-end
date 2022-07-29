import { Repository } from 'typeorm';
import { Comment } from '../../models/Comment';
import { User } from '../../models/User';
import { Like } from '../../models/Like';
import { AppDataSource } from '../../configs/db';
import CommentsRepository from '../../repositories/commentsRepository';
import UsersRepository from '../../repositories/usersRepository';
import CommentDto from '../../dtos/commentDto';

import HttpResponseDto from '../../dtos/httpResponseDto';
import deleteCommentValidations from '../../validations/comments/deleteCommentValidations';

export default class DeleteCommentUseCase {
  private _commentsRepository: Repository<Comment>;
  private _userRepository: Repository<User>;

  constructor() {
    this._commentsRepository = CommentsRepository;
    this._userRepository = UsersRepository;
  }

  public async execute({
    id,
    userId,
  }: Omit<CommentDto, 'postId' | 'message'>): Promise<HttpResponseDto | null> {
    const comment = await this._commentsRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    const user = await this._userRepository.findOne({
      where: { id: userId },
      relations: { role: true },
    });

    const responseValidation = deleteCommentValidations({ comment, user });

    if (responseValidation.statusCode !== 200) {
      return responseValidation;
    }

    let response = await AppDataSource.createQueryBuilder()
      .delete()
      .from(Like)
      .where('commentId = :id', { id })
      .execute()
      .then((): HttpResponseDto => {
        return { statusCode: 204, data: null };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    if (response.statusCode === 204) {
      response = await AppDataSource.createQueryBuilder()
        .delete()
        .from(Comment)
        .where('id = :id', { id })
        .execute()
        .then((): HttpResponseDto => {
          return { statusCode: 204, data: null };
        })
        .catch((): HttpResponseDto => {
          return { statusCode: 500, data: { error: 'Server Error' } };
        });
    }

    return response;
  }
}
