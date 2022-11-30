// dépendance api express
let express = require('express');
var fs = require("fs");

const app = express();

let bodyParser = require("body-parser");

var PORT = 3000;

// serveur html


var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})

// functions

function saveCom(content,target){
    let openFile = fs.readFileSync('Data/dbCom.json')
    let dbCom = JSON.parse(openFile)

    dbCom[target].push(content)

    dbComStr = JSON.stringify(dbCom)
    
    fs.writeFile("Data/dbCom.json", dbComStr, function(err) {
        if (err) {
            console.log(err)
        }
    })

}

function retrieveCom(target){
    let openFile = fs.readFileSync('Data/dbCom.json')
    let dbCom = JSON.parse(openFile)

    return dbCom[target]

}

function retriveMarks(target){
  let openFile = fs.readFileSync('Data/marks.json')
  let marks = JSON.parse(openFile)
  res = 0;
  marks.forEach(x=>{
      tmp = x.nomCommune
      if(tmp==target){
          res = x
      }
  })

  return res
}



/* app.use(express.json()); */

app.use(bodyParser.urlencoded({ extended: true }));

//méthode get qui affiche le formulaire
app.get('/note', function(request, response) {
  response.sendFile( __dirname  + '/post_note.html');
});

app.get('/celia', function(request, response) {
  response.sendFile( __dirname  + '/index.html');
});



app.get('/result', function(request, response) {
  let commune = request.body.nomCommune; //string type

  /* fonction Théo */

  console.log("commune = " + commune);
});

//le formulaire pointe en sortie vers la méthode post ci-après, permettant de récupérer la note saisie
app.post('/post', function(request, response) {
  const body = request.body;
  let note = body.note; //string type
  let commune = body.nomCommune; //string type
  let codeCP = body.codeCP; // string type
  //console.log(note);
  //console.log(commune);
  //console.log(codeCP);

  saveCom(note,commune);
  lst_com = retrieveCom(commune);
  lst_marks = retriveMarks(commune);
  //sumCom = sumCom(lst_com);
  //console.log(lst_com)
  //console.log(lst_marks)






  response.send(lst_marks);



});