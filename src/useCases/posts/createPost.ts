import { Repository } from 'typeorm';
import { Post } from '../../models/Post';
import { User } from '../../models/User';
import PostsRepository from '../../repositories/postsRepository';
import UsersRepository from '../../repositories/usersRepository';
import PostDto from '../../dtos/postDto';

import HttpResponseDto from '../../dtos/httpResponseDto';

export default class CreatePostUseCase {
  private _postsRepository: Repository<Post>;
  private _usersRepository: Repository<User>;

  constructor() {
    this._usersRepository = UsersRepository;
    this._postsRepository = PostsRepository;
  }

  public async execute({
    message,
    userId,
  }: Omit<PostDto, 'id'>): Promise<HttpResponseDto | null> {
    const post = new Post();
    post.message = message;

    const user = await this._usersRepository.findOne({
      where: { id: userId },
    });

    post.user = user;

    const response = await this._postsRepository
      .save(post)
      .then((): HttpResponseDto<Post> => {
        return { statusCode: 201, data: post };
      })
      .catch((): HttpResponseDto => {
        return { statusCode: 500, data: { error: 'Server Error' } };
      });

    return response;
  }
}
