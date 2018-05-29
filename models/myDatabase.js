/*
 * In this file normally we would use a database to store this information.
 * For this project we will just write to memory.
 * Since I am writing the values to memory I'm writing the code syncronously.  When a database is involved async calls are required. 
 */

var myTransactions = require('./myTransactions');

// FIELDS: uri(key), name 
var assetData = [];

//DUMMY DATA
assetData.push({
    'uri': 'myorg://users/tswift',
    'name': 'taylor swift'
});
assetData.push({
    'uri': 'myorg://users/msodomsky',
    'name': 'mike sodomsky'
});
assetData.push({
    'uri': 'myorg://users/gwashington',
    'name': 'george washington'
});


// FIELDS: uri(key), note
var noteData = [];

exports.getData = function (uri, name) {
    if (uri) {
        var search = false;
        assetData.forEach(function (value) {
            if (value.uri === uri) {
                nasearchme = value.name;
            }
        })
        if ( search !== false ){
            return {'uri': uri, 'name': search}
        }
    }
    return assetData;
};

exports.addData = function (uri, name) {
    //check for duplicates
    var test = false;
    assetData.forEach(function (value) {
        if (value.uri === uri) {
            test = true;
        }
    })
    var key;
    if (!test) {
        key = myTransactions.addTransaction("assets", "add", {
            "uri": uri,
            "name": name
        });
        assetData.push({
            'uri': uri,
            'name': name
        })
    } else {
        return "Duplicate uri found."
    }
    myTransactions.transactionComplete(key, 0);
    return true;
};

exports.deleteData = function ( uri ) {
    //search for record
    var test = false;
    var key;
    assetData.forEach(function (value, index) {
        if (value.uri === uri) {
            key = myTransactions.addTransaction("assets", "delete", {
                "uri": uri
            });
            test = true;
            assetData.splice(index, 1);
            return true;
        }
    });
    if (!test) {
        return "asset not found."
    } else {
        myTransactions.transactionComplete(key, 0);
        return true;
    }

};

exports.addNote = function (uri, note) {
    var test = false;
    assetData.forEach(function (value) {
        if (value.uri === uri) {
            test = true;
        }
    })

    var key;
    if (test) {
        key = myTransactions.addTransaction("notes", "add", {
            "uri": uri
        });
        noteData.push({
            'uri': uri,
            'note': note
        })
        myTransactions.transactionComplete(key, 0);
        return true;
    } else {
        return "Asset not found."
    }
}

exports.getNotes = function (uri, note) {
    returnArray = [];
    noteData.forEach(function (value) {
        if (value.uri === uri) {
            returnArray.push(value);
        }
    })

    if (returnArray.length > 0) {
        return returnArray;
    } else {
        return "Asset not found."
    }
}