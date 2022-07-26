import { Repository } from 'typeorm';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import { Comment } from '../../models/Comment';
import PostsRepository from '../../repositories/postsRepository';
import UsersRepository from '../../repositories/usersRepository';
import CommentsRepository from '../../repositories/commentsRepository';
import CommentDto from '../../dtos/commentDto';

import HttpResponseDto from '../../dtos/httpResponseDto';

export default class CreateCommentUseCase {
  private _commentsRepository: Repository<Comment>;
  private _postsRepository: Repository<Post>;
  private _usersRepository: Repository<User>;

  constructor() {
    this._commentsRepository = CommentsRepository;
    this._usersRepository = UsersRepository;
    this._postsRepository = PostsRepository;
  }

  public async execute({
    message,
    userId,
    postId,
  }: Omit<CommentDto, 'id'>): Promise<HttpResponseDto | null> {
    const comment = new Comment();
    comment.message = message;

    const user = await this._usersRepository.findOne({
      where: { id: userId },
    });

    const post = await this._postsRepository.findOne({
      where: { id: postId },
    });

    comment.user = user;
    comment.post = post;

    const response = await this._commentsRepository
      .save(comment)
      .then((): HttpResponseDto<Comment> => {
        return { statusCode: 201, data: comment };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    return response;
  }
}
