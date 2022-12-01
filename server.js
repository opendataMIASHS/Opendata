// dépendance api express
let express = require('express');
var fs = require("fs");
const request = require('request');

// func 

function retrieveCom(target){
  let openFile = fs.readFileSync('Data/dbCom.json')
  let dbCom = JSON.parse(openFile)

  return dbCom[target]

}

function saveCom(content,target){
  let openFile = fs.readFileSync('Data/dbCom.json')
  let dbCom = JSON.parse(openFile)

  dbCom[target].push(content)

  dbComStr = JSON.stringify(dbCom)
  
  fs.writeFileSync("Data/dbCom.json", dbComStr)

}

function mergeJson(){
  let openFranceJson = fs.readFileSync('Data/france.json')
  let franceJson = JSON.parse(openFranceJson)

  let res = []
  franceJson.forEach(x=> {
      let tmp = new Object()
      tmp.codeCommune = x.Code_commune_INSEE
      tmp.nomCommune  = x.Nom_commune
      res.push(tmp)
  })


  let openInternetJson = fs.readFileSync('Data/internet.json')
  let internetJson = JSON.parse(openInternetJson)


  internetJson.forEach(x=>{
      tmp = x.Code_INSEE
      res.forEach(y=>{
          if (tmp==y.codeCommune){
              y['scoreInternet'] = x.Score_Internet
          }

      })
  })


  let openBBJson = fs.readFileSync('Resultats.json')
  let bBJson = JSON.parse(openBBJson)

  console.log(bBJson)

  bBJson.forEach(x=>{
      tmp = x.commune
      res.forEach(y=>{
          if(tmp==y.codeCommune){
              console.log('toto')
              y['scoreBB'] = x.Score
              console.log(y['scoreBB'])
          }
      })
  })

  let openBioJson = fs.readFileSync('Data/bioScore.json')
  let bioJson = JSON.parse(openBioJson)

  bioJson.forEach(x=>{
      tmp = x.codecommune
      res.forEach(y=>{
          if(tmp==y.codeCommune){
              y['scoreBio'] = x.scoreBio
          }
      })
  })

  let openGazJson = fs.readFileSync('Scripts/gaz_elec_final.json')
  let gazJson = JSON.parse(openGazJson)

  gazJson.forEach(x=>{
      tmp = x.commune
      res.forEach(y=>{
          if(tmp==y.codeCommune){
              y['scoreGaz'] = x.indice_gaz
          }
      })
  })

}


function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  const sendReq = request.get(url);


  sendReq.on('response', (response) => {
      if (response.statusCode !== 200) {
          return cb('Response status was ' + response.statusCode);
      }
  });
  sendReq.on('error', (err) => {
      fs.unlink(dest);
      cb(err.message);
  });


  sendReq.pipe(file);

  file.on('finish', () => {
      file.close(cb);
  });

  file.on('error', (err) => {
      fs.unlink(dest);
      cb(err.message);
  });
};

const app = express();

let bodyParser = require("body-parser");

var PORT = 3000;

var _ = require("underscore");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));


const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');




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
  //response.render("../index.html");
});

app.get('/majData', function(request, response){
  mergeJson()
});

app.get('/dlBio', function(request,response){
  download('https://www.data.gouv.fr/fr/datasets/r/9db0425a-7de0-4197-88aa-b248be86e7f4', '/Data/bio.xlsx', (err) => {
      if (err) {
          console.error(err);
          return;
      }

    console.log('Téléchargement terminé !');
  })
})

app.get('/dlInternet', function(request,response){
  download('https://www.data.gouv.fr/fr/datasets/r/53d07e64-cda2-4c44-aea1-390a51e0e953', 'Data/internet.xlsx', (err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Téléchargement des données Internet terminé !');
})
})



//le formulaire pointe en sortie vers la méthode post ci-après, permettant de récupérer la note saisie
app.post('/post', function(request, response) {
  const body = request.body;
  let note = body.note; //string type
  let commune = body.nomCommune; //string type
  let codeCP = body.codeCP; // string type

  saveCom(note,commune);

  response.redirect('/Resultats/'+commune+'/'+codeCP);

});



app.get('/Resultats/:commune/:CP', function(request, response){

const data = fs.readFileSync('Data/marks.json');
var listeVille = JSON.parse(data);
//console.log(listeVille);
var filtered = _.where(listeVille, {nomCommune: request.params.commune});

var lst_com = retrieveCom(request.params.commune);


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


app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );