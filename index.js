const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/socialnetwork', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Use routes
app.use('/api/users', require('./api/routes/user-routes'));
app.use('/api/thoughts', require('./api/routes/thought-routes'));

// Start the server
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
