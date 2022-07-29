import { Repository } from 'typeorm';
import { Comment } from '../../models/Comment';
import CommentsRepository from '../../repositories/commentsRepository';
import CommentDto from '../../dtos/commentDto';

import HttpResponseDto from '../../dtos/httpResponseDto';
import updateCommentValidations from '../../validations/comments/updateCommentValidations';

export default class UpdateCommentUseCase {
  private _commentsRepository: Repository<Comment>;

  constructor() {
    this._commentsRepository = CommentsRepository;
  }

  public async execute({
    id,
    message,
    userId,
  }: Omit<CommentDto, 'postId'>): Promise<HttpResponseDto | null> {
    const comment = await this._commentsRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    const responseValidation = updateCommentValidations({
      comment,
      userId,
    });

    if (responseValidation.statusCode !== 200) {
      return responseValidation;
    }

    comment.message = message;

    const response = await this._commentsRepository
      .save(comment)
      .then((): HttpResponseDto<Comment> => {
        return { statusCode: 200, data: comment };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    return response;
  }
}
