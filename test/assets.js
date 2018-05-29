let myDatabase = require('../models/myDatabase');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let url = 'http://localhost:3000/assets';

chai.use(chaiHttp);


describe('getting assets', () => {
  it('it should return the initial sample data', (done) => {
    chai.request(url)
      .get('/get')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.length(3);
        res.body[0].should.eql({uri: "myorg://users/tswift", name: "taylor swift"});
        done();
      });
  });
});

describe('adding assets', () => {
  it('it should add a new asset', (done) => {
    chai.request(url)
      .get('/add?uri=myorg://users/wdisney&name=walt disney')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.eql("Successfully added URI: myorg://users/wdisney NAME: walt disney");
        done();
      });
  });
  it('it should add a new asset', (done) => {
    chai.request(url)
      .get('/add?uri=myorg://users/wdisney&name=walt disney')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.eql("Something went wrong adding. Duplicate uri found. URI: myorg://users/wdisney NAME: walt disney");
        done();
      });
  });
});


describe('deleting assets', () => {
  it('it should delete an asset', (done) => {
    chai.request(url)
      .get('/delete?uri=myorg://users/wdisney')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.eql("Successfully deleted URI: myorg://users/wdisney");
        done();
      });
  });
  it('it should fail deleting an asset', (done) => {
    chai.request(url)
      .get('/delete?uri=myorg://users/wdisney')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.eql("Something went wrong deleting. asset not found. URI: myorg://users/wdisney");
        done();
      });
  });
});