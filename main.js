var http = require('http');
var tabletojson = require('tabletojson');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/IT';

var phpcookie = '27nqpsjbg9fgpj252d7sr1q9q3	';
var accesstoken = '14420534';
var id = '56735796';

///////////////////////////////////////////
MongoClient.connect(url, function(err, db) {
  console.log("---(MongoClient) Connected to server");
  console.log("---ensuring indexes");
  ///////////////////////////////////////////
  ////// Creating Idexes
  ///////////////////////////////////////////
  db.createIndex('studentsmarks', {
    "roll": 1,
    Subject_Name: 1
  }, {
    unique: true
  }, function(err, indexName) {});
  ///////////////////////////////////////////
  ////// Initializing Roll Nos
  ///////////////////////////////////////////
  for (i = 1; i < 50; i++) {
    var t = '';
    if (i < 10) t = '14a91a12' + '0' + i;
    else t = '14a91a12' + i;

    getresults(t, db);
  }
});

///////////////////////////////////////////
////// The master piece function!!!
///////////////////////////////////////////
function getresults(roll, db) {

  var options = {
    host: 'jntukresults.edu.in',
    port: 80,
    headers: {
      'Cookie': 'PHPSESSID=' + phpcookie
    },
    path: '/results/res.php?ht=' + roll +
     '&id=' + id + '&accessToken=' + accesstoken
  };

  http.get(options, function(response) {
    var body = '';

    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {
      var resultdata = tabletojson.convert(body);
      if (resultdata[0] === undefined) {
        console.log("data: " + body);
        return console.error(roll + " == no data available");
      }
      var data = [];
      for (var i = 0; i < resultdata[0].length; i++) {
        data.push({
          Subject_Name: resultdata[0][i].Subject_Name,
          Internals: Number(resultdata[0][i].Internals),
          Externals: Number(resultdata[0][i].Externals),
          Credits: Number(resultdata[0][i].Credits),
          roll: roll,
          examid: id
        });
      }

      db.collection('studentsmarks').insert(
        data,
        function(err, docs) {
          if (err)
            return console.error(roll + " == " + err);
          else
            console.log(roll + ' Success!');
        });


    });

  }).on('error', function(e) {
    console.log(roll + "== Got error: (will retry)" + e.message);
    getresults(roll);
  });
}
