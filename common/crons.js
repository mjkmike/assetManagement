var CronJob = require('cron').CronJob;
myDatabase = require('../models/myDatabase');
var request = require('request');
var config = require('../configurations');


var myTransactions = require('../models/myTransactions');



// Runs every weekday every 5 minutes
var job = new CronJob('1 * * * * *', function () {
    
    //loop through transactions and send those out here.
    var currentTransactions = myTransactions.getTransactions();
    currentTransactions.forEach(function(value, index) {
        var i;
        removeTransaction = false;
        for (i = 1; i < value.siteStatus.length; i ++) {
            if (value.siteStatus[i] === false) {
                var siteURI = 'http://' + config.sites[i - 1].ip + ':' + config.sites[i - 1].port + '/' + value.type + '/' + value.method
                sendRequest(siteURI, value.data)
            }
        }
    });


    }, function () {
        /* This function is executed when the job stops */
    },
    true, 
    'America/New_York' 
);

// FIELDS: guid(key), type(assets or notes), method(add or delete), data(json data), siteStatus
function sendRequest(uri, data) {
    var options = {
        method: 'post',
        body: data,
        json: true,
        url: uri
    }
    request(options, (err, res, body) => {
        if (err) { 
            return new(Error("transaction failed"));
        } else if (res.statusCode === 200) {
            return true;
        }
        return new(Error("Unknown Error."));
      });
}