import { Repository } from "typeorm";
import PostDto from "../../dtos/postDto";
import { Post } from "../../models/Post";
import PostsRepository from "../../repositories/PostsRepository";

// criação de post

//TODO : Verificar dtos com banco de dados, erro nas tipagens 
export default class CreatePostsUseCase{
  private _repository: Repository<Post>;

  constructor(){
    this._repository = PostsRepository;
  }

  public async execute({message} : Omit<PostDto, 'id'>) : Promise<Post> {
    const post = new Post();
    post.message = message;
    
    await this._repository.save(post);
    return post;
  }
}