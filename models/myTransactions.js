/*
* In this file normally we would use a database to store this information.
* For this project we will just write to memory.
* Normally for a transaction table like this I would save the mongo for example 
* transactions but since this is all code it will be hardcoded.
*/

var config = require('../configurations');

var numberOfSites = config.sites.length + 1;

/* FIELDS: key, type(assets or notes), method(add or delete), data(json data), siteStatus
*   SiteStatus object: [true or false(currentSite), true or false(site2), etc ...]
*/
var transactionData = [];

exports.addTransaction = function(type, method, data) {
    var key = guid();
    var siteStatus = [];
    for(var i = 0; i < numberOfSites; i++) {
        siteStatus.push(false);
    }
    transactionData.push({'key': key, 'type': type, 'method': method, 'data': data, 'siteStatus': siteStatus});

    return key;
};

exports.transactionComplete = function(key, site) {
    var test = false;
    transactionData.forEach(function (value, index) {
        if( value.key === key ) {
            value.siteStatus[site] = true;
        }
    });
};

exports.getTransactions = function() {
    return transactionData;
}

exports.deleteTransaction = function(key) {
    transactionData.forEach(function (value, index) {
        if( value.key === key ) {
            transactionData.splice(index, 1);
        }
    });
}

// mostly random guids for this use case.  Let DB handle this normally
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}