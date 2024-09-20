import express from "express";

const app = express();

app.get('hello', (req, res) => {
  res.send('Hello Express!!');
});

app.listen(3000, () => console.log('Server Stared'));

