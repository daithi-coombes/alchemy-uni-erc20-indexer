const { Alchemy, Network } = require('alchemy-sdk');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({path: '../.env'});

const app = express();
app.use(cors());
app.use(express.json());

const API_PORT = process.env.API_PORT || 3000;
const opts = {
  apiKey: process.env.ALCHEMY_API,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(opts)

app.post('/core/:method', (req, res) => {
  const { method } = req.params;

  alchemy.core[method](...req.body.args)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log('err: ', err);
      res.status(500).send(err);
    })
});

if (require.main === module ) {
  app.listen(API_PORT, () => {
    console.log(`API running on port ${API_PORT}`);
  });
}

module.exports = app;