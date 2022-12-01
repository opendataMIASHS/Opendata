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
	  console.log(content);
	  console.log(target);
    let openFile = fs.readFileSync('Data/dbCom.json')
    console.log(openFile);
    let dbCom = JSON.parse(openFile)
    //console.log(dbCom);

    if (target in dbCom.keys()){
      dbCom[target].push(content)
    }
    
    console.log(dbCom[0])

    dbComStr = JSON.stringify(dbCom)

    console.log(dbComStr);

    
    
    fs.writeFile("Data/dbCom.json", 'toto', function(err) {
      if (err) throw err;
      console.log('Data written to file');
    })

}

function retrieveCom(target){
	  console.log(target);
    let openFile = fs.readFileSync('Data/dbCom.json')
    //console.log("ici");
    let dbCom = JSON.parse(openFile)
    //console.log("dss",dbCom[target]);
    //console.log("dss",dbCom);


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


  //let promiseCom = saveCom(note,commune).then(retrieveCom(commune));
  //let promiseMarks = retriveMarks(commune);
  //sumCom = sumCom(lst_com);
  const p1= new Promise(function(resolve, reject) { 
  	saveCom(note,commune);
  	a=retrieveCom(commune);
  	resolve(a);
  	            

  });

  const p2= new Promise(function(resolve, reject) { 
  	b=retriveMarks(commune);
  	resolve(b);
  	            

  });
  //console.log(lst_com)
  //console.log(lst_marks)



  Promise.all([p1, p2]).then(function(values){
    response.send(value[0],value[1]);
  });



});