var express = require('express');
var router = express.Router();
myDatabase = require('../models/myDatabase');
utilites = require('../common/utilities');

/* GET assets listing. */
router.all('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/get', function(req, res, next) {
  res.send(myDatabase.getData(req.query.uri));
});

router.all('/get', function(req, res, next) {
  res.send(myDatabase.getData(req.body.uri));
});

router.get('/add', function(req, res, next) {
  if(req.query.uri && req.query.name) {
    res.send(addAsset(req.query.uri, req.query.name));
  } else {
    res.send('Missing query paramaters.');
  }
});

router.post('/add', function(req, res, next) {
  if(req.body.uri && req.body.name) {
    res.send(addAsset(req.body.uri, req.body.name));
  } else {
    res.send('Missing query paramaters.');
  }
});

router.get('/delete', function(req, res, next) {
  if(req.query.uri) {
    res.send(deleteAsset(req.query.uri));
  } else {
    res.send('Missing query paramaters.');
  }
});

router.post('/delete', function(req, res, next) {
  if(req.body.uri) {
    res.send(deleteAsset(req.body.uri));
  } else {
    res.send('Missing query paramaters.');
  }
});

function addAsset(uri, name) {
  var dataEntry = myDatabase.addData(uri, name);
  if( dataEntry === true) {
    return true;
  } else {
    return 'Something went wrong adding. ' + dataEntry + ' URI: ' + uri + ' NAME: ' + name;
  }
}

function deleteAsset(uri) {
  var dataDeletion = myDatabase.deleteData(uri);
    if( dataDeletion === true) {
      return true;
    } else {
     return 'Something went wrong deleting. ' + dataDeletion + ' URI: ' + uri;
    }
}

module.exports = router;
