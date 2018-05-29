var express = require('express');
var router = express.Router();
myDatabase = require('../models/myDatabase');
utilites = require('../common/utilities');

/* GET assets listing. */
router.all('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get', function(req, res, next) {
  if(req.query.uri) {
    res.send(getNotes(req.query.uri));
  } else {
    res.send('Missing query paramaters.');
  }
});

router.post('/get', function(req, res, next) {
  if(req.body.uri) {
    res.send(getNotes(req.body.uri));
  } else {
    res.send('Missing query paramaters.');
  }
});

router.all('/add', function(req, res, next) {
  if(req.query.uri && req.query.note) {
    
  } else {
    res.send('Missing query paramaters.');
  }
});

function getNotes(uri) {
  var data = myDatabase.getNotes(uri);
  return data;
}

function addNote(uri, note) {
  var dataEntry = myDatabase.addNote(uri, note);
    if( dataEntry === true) {
      return true
    } else {
      return 'Something went wrong putting. ' + dataEntry + ' URI: ' + uri + ' NOTE: ' + note;
    }
}

module.exports = router;
