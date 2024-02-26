const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;
console.log("PROCESS.ENV: ", process.env)

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors('*'));

// In-memory storage for simplicity (replace with database in production)
let users = [{
  id: 1,
  credits: 42,
  avatarUrl: 'https://i.pravatar.cc/100',
}];
let voiceModels = [];

// CRUD endpoints for User entity
app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateUser = req.body;
  users = users.map(user => (user.id === id ? updateUser : user));
  res.json(updateUser);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).send();
});

// CRUD endpoints for VoiceModel entity
app.get('/voicemodels', (req, res) => {
  res.json(voiceModels);
});

app.post('/voicemodels', (req, res) => {
  const voiceModel = req.body;
  voiceModels.push(voiceModel);
  res.status(201).json(voiceModel);
});

app.get('/voicemodels/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const model = voiceModels.find(model => model.id === id);
  if (!model) {
    res.status(404).send('Voice model not found');
  } else {
    res.json(model);
  }
});

app.put('/voicemodels/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateModel = req.body;
  voiceModels = voiceModels.map(model => (model.id === id ? updateModel : model));
  res.json(updateModel);
});

app.delete('/voicemodels/:id', (req, res) => {
  const id = parseInt(req.params.id);
  voiceModels = voiceModels.filter(model => model.id !== id);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
