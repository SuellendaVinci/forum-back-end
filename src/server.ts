import express from 'express';
import { AppDataSource } from './configs/db';
import { User } from './models/User';
import { Role } from './models/Role';
import { Post } from './models/Post';
import { Comment } from './models/Comments';
import { Like } from './models/Like';
import { Repository } from 'typeorm/repository/Repository';
import routes from './routes';

const PORT = 3333;
const app = express();
app.use(express.json());
app.use(routes)

app.listen(3333, () => {
  console.log(`Server is running on port ${PORT}`);
});

AppDataSource.initialize()
    .then(async () => {
      console.log('Inserting a new user into the database...');
      const role = new Role();
      role.name = 'Administrator';
      await AppDataSource.manager.save(role);    
    })
    .catch(error => console.log(error));

         // Crate new Post route
  app.post('/post', (req, res) => {
    const post = new Post();
    //post.comments = req.body.comments;
    post.message = req.body.message;
    //post.user = req.body.user

    AppDataSource.manager.save(post);

    res.send(post);
  });

  app.get('/post', (req, res) => {
    // (AppDataSource
    //   .createQueryBuilder()
    //   .select()
    //   .from(Post, "post")
    //   .getMany()).then( posts => res.send(posts))

      AppDataSource.query(`SELECT * FROM POSTS WHERE ID = 5`).then( posts => res.send(posts))
  });