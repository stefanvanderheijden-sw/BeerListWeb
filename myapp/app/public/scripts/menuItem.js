class menuItem {
    constructor(name,type) {
        this.name = name;
        this.type = type;
    }

    action() {
            if (this.type == "substractBeer") {
                $("#instructions").html("Select a housemate from which to substract a beer")
                window.state = "substractBeer";
                var menuNameList = [];
                window.housemates.forEach(function(housemate) {
                    menuNameList.push(new menuItem(housemate.name,"housemateToSubstract"));
                })
                
                $("#topButton").text("Substract a beer");
                $("#bottomButton").text("Home");

                window.mainMenu.clear();
                window.mainMenu.updateContent(menuNameList);
                
              
            }

            else if (this.type == "housemateToSubstract") {


                var housemateToSubstract = window.housemates.find(housemateTemp => {
                    return housemateTemp.name === this.name;
                  })

                housemateToSubstract.substractBeer();
                window.state = "overview";

                window.mainMenu.clear();
                window.mainMenu.updateContent(window.housemates);
                $("#instructions").html("Select a housemate using the wheel and add a beer using the top-right button.<br> Press menu for more options.")
                $("#topButton").text("Add beer");
                $("#bottomButton").text("Menu");
                
                
              
            }

            else if (this.type == "addHousemate") {
                
                window.state = "newHousemate";
                var menuLetterList = [];
                var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","&","space","Delete last letter!"];
                alphabet.forEach(function(letter) {
                    menuLetterList.push(new menuItem(letter,"letterAdd"));
                })
                
                $("#topButton").text("Add letter to name");
                $("#bottomButton").text("Add this housemate");

                

                window.nameMaker = " ";
                window.mainMenu.clear();
                window.mainMenu.updateContent(menuLetterList);

                $("#instructions").html("Select a letter and press the top-right button.<br><br> Name: <br>"+window.nameMaker)
              
            }

            else if (this.type == "letterAdd") {
                var lastLetter = window.nameMaker.slice(-1);

                if (this.name == "space") {
                    window.nameMaker += " ";
                } 
                else if (this.name == "Delete last letter!") {
                    window.nameMaker = window.nameMaker.slice(0, -1);
                }
                else if (lastLetter == " ") {
                    window.nameMaker += this.name;
                }
                else {
                    window.nameMaker += this.name.toLowerCase();
                }
                $("#instructions").html("Select a letter and press the top-right button.<br><br> Name: <br>"+window.nameMaker)
              
            }

            else if (this.type == "deleteHousemate") {
                $("#instructions").html("Select a housemate to delete from the beerlist <br> WARNING: THERE IS NO CTRL-Z WHERE WE ARE GOING")
                window.state = "deleteHousemate";
                var menuNameList = [];
                window.housemates.forEach(function(housemate) {
                    menuNameList.push(new menuItem(housemate.name,"housemateToDelete"));
                })
                
                $("#topButton").text("DELETE HOUSEMATE");
                $("#bottomButton").text("Home");

                window.mainMenu.clear();
                window.mainMenu.updateContent(menuNameList);
            }

            else if (this.type == "housemateToDelete") {
                console.log("sending name " + this.name + " to be deleted")
                window.socket.emit('deleteThisHouseMate',this.name);

            }
        }
    }

    export {menuItem};