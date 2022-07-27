import express from 'express';
import routes from './routes';
import cors from 'cors';
import { AppDataSource } from './configs/db';

const PORT = process.env.PORT || 3333;
const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.log(error));
