import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('EventHorizon API is running');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
