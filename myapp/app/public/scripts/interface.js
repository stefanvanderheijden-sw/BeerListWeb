import { housemate } from './housemateClass.js';
import { menu } from './menu.js';
import {menuItem} from './menuItem.js'
import {mediaPlayer} from './mediaPlayer.js'

var NoAudioFiles = 45;
var audioFiles = [];

for (var i = 1; i < (NoAudioFiles+1); i++) {
  var stri = i.toString();
  var tempAudioObject = document.getElementById(stri);
  audioFiles.push(tempAudioObject);
}

var player = new mediaPlayer(audioFiles);

var socket = io.connect();

$("#bottomButton").text("Menu");
$("#topButton").text("Add beer");

socket.on('connect', () => {
});
window.housemates = [];
window.nameMaer = " ";
var housematesData = [];
window.mainMenu = new menu(0,[]);

window.state = "overview";

var menuItems = 
  [new menuItem("Substract a beer from a housemate","substractBeer"),
  new menuItem("Add a housemate","addHousemate"),
  new menuItem("Delete a housemate","deleteHousemate"),
  new menuItem("Clear beer list","clearBeerList")];

socket.on('housemateData', data => {
    housemates = [];
    housematesData = data;
    housematesData.forEach(function(housemateData){
        housemates.push(new housemate(housemateData.name,housemateData.beercount,mainMenu))
    });

    housemates.sort(SortByName);
    mainMenu.updateContent(housemates);
    window.state = "overview";

    $("#instructions").html("Select a housemate using the wheel and add a beer using the top-right button.<br> Press menu for more options.")
    $("#topButton").text("Add beer");
    $("#bottomButton").text("Menu");
  });

function SortByName(a, b){
  var aName = a.name.toLowerCase();
  var bName = b.name.toLowerCase(); 
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

$(document).on('keydown',function(e) {
  var key = e.which;
  if(key == 65) {
    mainMenu.selectorUp();
  }
  if(key == 81) {
    mainMenu.selectorDown();
  }
  if(key == 80) {
    // This is the upper button
    player.playTune();
    mainMenu.click();
  }
  if(key == 76) {
    // This is the lower button
    if (window.state == "overview") {
      window.state = "menu";
      mainMenu.clear();
      mainMenu.updateContent(menuItems);
      $("#instructions").text("Use the wheel to browse the menu.")
      $("#topButton").text("Select");
      $("#bottomButton").text("Back");
    }

    else if (window.state == "newHousemate"){ 
      socket.emit('addThisHousemate',window.nameMaker);
      // housemates.push(new housemate(window.nameMaker,0,mainMenu));
      $("#instructions").html("Select a housemate using the wheel and add a beer using the top-right button.<br> Press menu for more options.")
      $("#topButton").text("Add beer");
      $("#bottomButton").text("Menu");
      mainMenu.updateContent(housemates);
      window.state = "overview";
    }

    else { 
      $("#instructions").html("Select a housemate using the wheel and add a beer using the top-right button.<br> Press menu for more options.")
      $("#topButton").text("Add beer");
      $("#bottomButton").text("Menu");
      housemates.sort(SortByName);
      mainMenu.updateContent(housemates);
      window.state = "overview";
    }
  }
});

