// dépendance api express
let express = require('express');

const app = express();

let bodyParser = require("body-parser");

var PORT = 3000;

// serveur html


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})




/* app.use(express.json()); */

app.use(bodyParser.urlencoded({ extended: true }));

//méthode get qui affiche le formulaire
app.get('/note', function(request, response) {
  response.sendFile( __dirname  + '/post_note.html');
});

app.get('/celia', function(request, response) {
  response.sendFile( __dirname  + '/i.html');
});



app.get('/result', function(request, response) {
  let commune = request.body.nomCommune; //string type

  /* fonction Théo */

  console.log("commune = " + commune);
});

//le formulaire pointe en sortie vers la méthode post ci-après, permettant de récupérer la note saisie
app.post('/post', function(request, response) {
  const body = request.body;
  let rg1 = body.rg1; //string type
    let commune = body.nomCommune2; //string type


  /* fonction Théo */


  console.log("note = " + rg1);
  console.log("note = " + commune);

});