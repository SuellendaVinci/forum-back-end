import { Repository } from 'typeorm';
import { Post } from '../../models/Post';
import PostsRepository from '../../repositories/postsRepository';

import HttpResponseDto from '../../dtos/httpResponseDto';

export default class ListPostsUseCase {
  private _postsRepository: Repository<Post>;

  constructor() {
    this._postsRepository = PostsRepository;
  }

  public async execute(): Promise<HttpResponseDto | null> {
    const post = await this._postsRepository.find({
      relations: { comments: true, user: true },
    });

    return { statusCode: 200, data: post };
  }
}
