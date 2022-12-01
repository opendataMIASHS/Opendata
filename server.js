// dépendance api express
let express = require('express');
var fs = require("fs");

const app = express();

let bodyParser = require("body-parser");

var PORT = 3000;

var _ = require("underscore");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

var array=require("array");


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})

app.get('/getAll', function(request, response) {
const data = fs.readFileSync('Data/marks.json');
response.send(JSON.parse(data));
});

app.get('/get/:ville', function(request, response) {
const data = fs.readFileSync('Data/marks.json');
var listeVille = JSON.parse(data);
var filtered = _.where(listeVille, {nomCommune: request.params.ville});
response.send(filtered);
});



app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(request, response) {
  response.sendFile( __dirname  + '/index.html');
});



//le formulaire pointe en sortie vers la méthode post ci-après, permettant de récupérer la note saisie
app.post('/post', function(request, response) {
  const body = request.body;
  let note = body.note; //string type
  let commune = body.nomCommune; //string type
  let codeCP = body.codeCP; // string type

   response.redirect('/Resultats/'+commune+'/'+codeCP);

});



app.get('/Resultats/:commune/:CP', function(request, response){

const data = fs.readFileSync('Data/marks.json');
var listeVille = JSON.parse(data);
//console.log(listeVille);
var filtered = _.where(listeVille, {nomCommune: request.params.commune});


var code=filtered[0]['codeCommune'];
var nom=filtered[0]['nomCommune'];
var int=filtered[0]['scoreInternet'];
var gaz=filtered[0]['scoreGaz'];
var ed=filtered[0]['scoreBB'];
var bio=filtered[0]['scoreBio'];

    response.render("../Resultat.ejs", {
    a: code,
    b: nom,
    c: int,
    d: gaz,
    e: ed,
    f:bio
    
});
  });