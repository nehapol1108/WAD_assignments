const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
// Setting path for public directory
const static_path = path.join(__dirname, 'public');
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
// Handling request
app.get('/request', (req, res) => {
  console.log('Hello from inside of get server');
  res.send([
    {
      email: 'shubhampitale45@gmail.com',
      password: 'Hello',
      name: 'Shubham',
      phone: '8291039175',
      username: 'shubhampitale',
      address: {
        city: 'Kalyan',
      },
    },
  ]);
});
app.post('/request', (req, res) => {
  console.log('Hello from inside of post server');
  res.status(201).send('User created successfully');
});
// Server Setup
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
