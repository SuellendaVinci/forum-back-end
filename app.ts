const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const app = express();

app.use(express.json());

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/src/MOCK/MOCK_DATA.json`),
);

app.get('/users', (req, res) => {
  res.status(200).json({
    status: 'sucess',
    results: users.length,
    data: {
      users,
    },
  });
});

app.post('/users', (req, res) => {
  const id = uuidv4();
  const user = {
    id,
    ...req.body,
  };

  res.send(user);
});

app.patch('/users', (req, res) => {});

app.delete('/users', (req, res) => {});

const PORT = 3001;

app.listen(PORT, () => console.log(`~*~ App running on port: ${PORT} ~*~`));
