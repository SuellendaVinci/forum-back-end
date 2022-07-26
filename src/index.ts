import express from 'express';
import routes from './routes';
import { AppDataSource } from './configs/db';

const PORT = 3333;
const app = express();

app.use(express.json());

app.use(routes);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.log(error));
