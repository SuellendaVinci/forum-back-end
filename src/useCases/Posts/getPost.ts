import { Repository } from "typeorm";
import { Post } from "../../models/Post";
import PostsRepository from "../../repositories/postRepository";

export default class GetPostUseCase {
  private _repository: Repository<Post>;
  constructor() {
    this._repository = PostsRepository;
  }

  public async execute(): Promise<Post[]> {
    return await this._repository.find();
  }
}