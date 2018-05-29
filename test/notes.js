let myDatabase = require('../models/myDatabase');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let url = 'http://localhost:3000/notes';

chai.use(chaiHttp);


describe('adding assets', () => {
    it('it should add a new asset', (done) => {
        chai.request(url)
        .get('/add?uri=myorg://users/gwashington&note=First President')
        .end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.eql("Successfully added note.  URI: myorg://users/gwashington NOTE: First President");
            done();
        });
    });
});

  
describe('getting assets', () => {
  it('it should return the initial sample data', (done) => {
    chai.request(url)
      .get('/get?uri=myorg://users/gwashington')
      .end((err, res) => {
        res.should.have.status(200);
        res.body[0].should.eql({uri: "myorg://users/gwashington", note: "First President"});
        done();
      });
  });
});