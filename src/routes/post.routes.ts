import { Router } from "express";
import PostDto from "../dtos/postDto";
import GetPostUseCase from "../useCases/Posts/getPost";

const postRoutes = Router();

postRoutes.get("/", async (request, response) => {
  const postCase = new GetPostUseCase();
  const posts = await postCase.execute();
  return response.send(posts);
})

export default postRoutes;