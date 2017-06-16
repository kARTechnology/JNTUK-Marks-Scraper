var http = require('http');
var tabletojson = require('tabletojson');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/IT';


//ensure to change both id and rollnos together...else there might be overwiring issues
var phpcookie = 'gtfsur2fedau742eev06j8jvd0	';
var accesstoken = '554111';
var id = '56735796';

///////////////////////////////////////////

MongoClient.connect(url, function(err, db) {
  console.log("---(MongoClient) Connected to server");
  console.log("---ensuring indexes");

  ///////////////////////////////////////////
  db.createIndex('studentsmarks', {
    "roll": 1,
    Subject_Name: 1
  }, {
    unique: true
  }, function(err, indexName) {});

  ///////////////////////////////////////////

  for (i = 1; i < 50; i++) {
    var t = '';
    if (i < 10) t = '14a91a12' + '0' + i;
    else t = '14a91a12' + i;

    getresults(t, db);
  }
});

///////////////////////////////////////////

function getresults(roll, db) {

  var options = {
    host: 'jntukresults.edu.in',
    port: 80,
    headers: {
      'Cookie': 'PHPSESSID='+phpcookie
    },
    path: '/results/res.php?ht=' + roll + '&id=' + id + '&accessToken=' + accesstoken
  };

  http.get(options, function(response) {
    //  console.log("Got response: " + response.statusCode);
    var body = '';

    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      //  console.log("Got data: " + body);
      var table = tabletojson.convert(body);
      if (table[0] === undefined) {
        console.log("data: " + body);
        return console.error(roll + " == no data available");
      }
      var data = [];
      for (var i = 0; i < table[0].length; i++) {
        data.push({
          Subject_Name: table[0][i].Subject_Name,
          Internals: Number(table[0][i].Internals),
          Externals: Number(table[0][i].Externals),
          Credits: Number(table[0][i].Credits),
          roll: roll,
          examid:id
        });
      }

      db.collection('studentsmarks').insert(
        data,
        function(err, docs) {
          if (err) {
            return console.error(roll + " == " + err);
          } else {
            console.log(roll + ' Success!');
          }
        });
    });

  }).on('error', function(e) {
    console.log(roll + "== Got error: (will retry)" + e.message);
    getresults(roll);
  });
}
