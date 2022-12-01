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

function saveComAndRetrieve(content,target){
  let openFile = fs.readFileSync('Data/dbCom.json')
  
  let dbCom = JSON.parse(openFile)
  

  dbCom[target].push(content)

  dbComStr = JSON.stringify(dbCom)
  
  fs.writeFileSync("Data/dbCom.json", dbComStr);

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

  lst_com = saveComAndRetrieve(note,commune);
  lst_mark = retriveMarks(commune);
  console.log(lst_mark);

  response.send(lst_com+' '+lst_mark)


  //let promiseCom = saveCom(note,commune).then(retrieveCom(commune));
  //let promiseMarks = retriveMarks(commune);
  //sumCom = sumCom(lst_com);
  // const p1= new Promise(function(resolve, reject) { 
  // 	a=saveComAndRetrieve(note,commune);
  // 	resolve(a);
  	            

  // });

  // const p2= new Promise(function(resolve, reject) { 
  // 	b=retriveMarks(commune);
  // 	resolve(b);
  	            

  // });
  //console.log(lst_com)
  //console.log(lst_marks)



  // Promise.all([p1, p2]).then(function(values){
  //   response.send(values[0],values[1]);
  // });



});