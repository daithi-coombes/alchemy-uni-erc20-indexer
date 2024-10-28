const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('mock-require');

chai.use(chaiHttp);

mock('alchemy-sdk', {
  Alchemy: class{
    core;
    opts;
    constructor(opts) {
      this.core = {
        foobar: async () => 'bizbaz',
      };
    }
  },
  Network: {
    ETH_MAINNET: 'test',
  },
});

const underTest = require('../index');

describe('index.js', () => {

  it('will handle alchemy.core message', async () => {
    chai.request(underTest)
      .post('/core/foobar')
      .send({
        args: ['0x01'],
      })
      .end((err, res) => {
        chai.expect(err, null);
        chai.expect(res.text, 'bizbaz');
      });
  });
});