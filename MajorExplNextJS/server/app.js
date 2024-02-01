const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config()

const { MongoClient, Collection } = require("mongodb");
const uri = "mongodb+srv://coe_admin:" + process.env.MONGODB_KEY + "@cs46x.l19wpnk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const database = client.db('CoE');

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log("Server listening on Port", PORT);
});

let conn;
try {
  conn = client.connect();
} catch(e) {
  console.error(e);
}
let Questions = database.collection('Questions')

// Get all questions
app.get('/questions', async (request, response) => {
  let result = await Questions.find({}).toArray();
  if (!result) response.sendStatus(404);
  else response.send(result).status(200);
});

// Post Function
// Create a question using this endpoint
// Use a question string and weight in request body to update the DB 
app.post('/create/question', async (request, response) => {
  // TO FIX: 403 Error handling for duplicate question name
  // if (Questions.find({"name": request.body.name}).limit(1).length === 0) {
  //   return response.send('Question already exists')
  // }
  if (request.body) {
    const body = request.body;
    const question = body.question;
    const weight = body.weight;
    const name = body.name;
    const query = {
      question, 
      weight,
      name
    };
    await Questions.insertOne(query);
    response.send('Created Question').status(200);
  } else {
    response.sendStatus(404);
  }
});

// Update Function
// TODO: Need to add error handling

app.put('/update/question/:name', async (request, response) => {
  const name = request.params.name;
  const query = {name};
  const question = request.body.question;
  const weight = request.body.weight;
  const newData = {question, weight};
  // Create new entry option if question name does not exist
  const options = { upsert: true };
  await Questions.updateOne(query, newData, options);
  response.send('Updated Question').status(200);
});

// Delete Function
// TODO: Error handling

app.delete('/delete/question/:name', async (request, response) => {
  const name = request.params.name;
  const query = {name};
  await Questions.deleteOne(query);
  response.send('Deleted Question').status(200);
});