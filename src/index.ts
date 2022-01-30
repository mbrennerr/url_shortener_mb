import express from 'express';

const api = express();

api.get('/test', (req, res) => {
  res.json({ sucess: true })

})
api.listen(5000, () => console.log('listening on port 5000'));
