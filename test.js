
var fs = require('fs')



function searchOneBio(nomVille,file){
    let openFile = fs.readFileSync(file)
    let bioScore = JSON.parse(openFile)

    let res = []
    bioScore.forEach(x => {
        if (x.libellecommune == nomVille){
            res.push(x.scoreBio)
        }
    })

    return res.reduce((partialSum, a) => partialSum + a, 0)

}

//console.log(searchOneBio('ARANDAS','Data/bioScore.json'))


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

    //console.log(internetJson)

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

    //console.log(res)


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





    var dataTest = mergeJson()

    var data = JSON.stringify(dataTest)


    fs.writeFile("Data/test.json", data, function(err) {
        if (err) {
            console.log(err)
        }
    })

}


//mergeJson()

function createdB(){
    let openFranceJson = fs.readFileSync('Data/france.json')
    let franceJson = JSON.parse(openFranceJson)

    res = new Object()
    //console.log(res)
    franceJson.forEach(x=>{
            //console.log(x.Nom_commune)
            res[x.Nom_commune] = []
            //console.log(res)
        }
    )

    //console.log(res)

    resStr = JSON.stringify(res)

    console.log(resStr)
    
    fs.writeFile("Data/dbCom.json", resStr, function(err) {
        if (err) {
            console.log(err)
        }
    })

}

//console.log('Start')

//createdB()

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

//saveCom('test','CUCUGNAN')


function retrieveCom(target){
    let openFile = fs.readFileSync('Data/dbCom.json')
    let dbCom = JSON.parse(openFile)

    return dbCom[target]

}

//console.log(retrieveCom('CUCUGNAN'))


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

    

    


// console.log(retriveMarks('MONTPELLIER'))


function retrieveCom(target){
    console.log(target)
    let openFile = fs.readFileSync('Data/dbCom.json')
    console.log(openFile)
    let dbCom = JSON.parse(openFile)

    return dbCom[target]

}

console.log(retrieveCom('MONTPELLIER'))