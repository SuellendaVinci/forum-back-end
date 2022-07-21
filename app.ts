const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const app = express();

app.use(express.json());

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/src/MOCK/MOCK_DATA.json`),
);

// Get All Users Route
app.get('/users', (req, res) => {
  res.status(200).json({
    status: 'sucess',
    results: users.length,
    data: {
      users,
    },
  });
});

// Get User By ID Route
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.filter(user => user.id === id);
  res.status(200).json({
    status: 'sucess',
    data: {
      user,
    },
  });
});

// Create New User Route
app.post('/users', (req, res) => {
  const id = uuidv4();
  const user = {
    id,
    ...req.body,
  };

  res.send(user);
});

const PORT = 3001;

app.listen(PORT, () => console.log(`~*~ App running on port: ${PORT} ~*~`));
