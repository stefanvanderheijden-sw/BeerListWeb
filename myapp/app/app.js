var express = require("express");  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
const fs = require('fs');

housemates = []

function readHousematesJSON() {
    var housematesData;
    data = fs.readFileSync('./data/housemates.json');
        housematesData = JSON.parse(data)        
        return housematesData;
}

function addHousemate(newName) {
    fs.readFile('./data/housemates.json', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        var tempObj = JSON.parse(jsonString);
        tempObj.push({"name":newName,"beercount":0})
        newJsonString = JSON.stringify(tempObj);
        fs.writeFile('./data/housemates.json',newJsonString)
    })
}

function deleteHousemate(deleteName) {
    fs.readFile('./data/housemates.json', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        var housematesData = JSON.parse(jsonString);
        housematesData.forEach(function(housemateTemp,index) {
            if (housemateTemp.name === deleteName) {
                housematesData.splice(index,1);
            }
        });
        newJsonString = JSON.stringify(housematesData);
        fs.writeFile('./data/housemates.json',newJsonString);

    })
}

function addBeerToHouseMate(beerName) {
    console.log("adding a beer to " + beerName);
    fs.readFile('./data/housemates.json', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        var housematesData = JSON.parse(jsonString);
        
        var housemateToSubstractBeerFrom = housematesData.find(housemateTemp => {
            return housemateTemp.name === beerName;
          })
        
        housemateToSubstractBeerFrom.beercount += 1;

        var newJsonString = JSON.stringify(housematesData);
        fs.writeFileSync('./data/housemates.json',newJsonString);

    });
}

function substractBeerFromHouseMate(beerName) {
    // Yes this could be the same function as addBeer but whatever
    console.log("adding a beer to " + beerName);
    fs.readFile('./data/housemates.json', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        var housematesData = JSON.parse(jsonString);
        
        var housemateToSubstractBeerFrom = housematesData.find(housemateTemp => {
            return housemateTemp.name === beerName;
          })
        
        housemateToSubstractBeerFrom.beercount -= 1;

        var newJsonString = JSON.stringify(housematesData);
        fs.writeFileSync('./data/housemates.json',newJsonString);

    });
}

app.use(express.static(__dirname + '/node_modules'));  
app.use(express.static('public'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    var housemateData = readHousematesJSON();

    socket.emit('housemateData',housemateData)

    socket.on('deleteThisHouseMate', function(housemateName){
        deleteHousemate(housemateName);
        socket.emit('housemateData',housemateData)
    });
    
    socket.on('addThisHousemate', function(housemateName) {
        console.log("adding a new housemate");
        console.log("got this info: " + housemateName);
        addHousemate(housemateName);
        socket.emit('housemateData',housemateData)
    });

    socket.on('cheers', function(housemateName) {
        addBeerToHouseMate(housemateName);
    })

    socket.on('noCheers', function(housemateName) {
        substractBeerFromHouseMate(housemateName);
    })

  });

server.listen(4200);