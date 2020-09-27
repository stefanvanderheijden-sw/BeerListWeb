class housemate {
    constructor(name,beerCount,mainMenu) {
      this.name = name;
      this.beerCount = beerCount;
      this.visualBeer = "<br>";
      this.updateVisualBeer()
      this.mainMenu = mainMenu;
    }

    updateVisualBeer () {
      if (this.beerCount > 0) {
        this.visualBeer = "";
      }
      var tempBeer = this.beerCount;
      var i;
      var crates = parseInt((tempBeer / 24));
      if (crates > 0) {
        for (i = 0; i < crates; i++) {
        this.visualBeer += "[Kratje]";
      }
      }
      tempBeer -= crates * 24;
      for (i = 0; i < tempBeer; i++) {
        if (i%5 == 0) {
          this.visualBeer += "     ";
        }
        this.visualBeer += "/";
      }
    }

    addBeer () {
      this.beerCount += 1;
      this.updateVisualBeer();
      this.mainMenu.updateMyBeer();
    }

    substractBeer () {
      this.beerCount -= 1;
      this.updateVisualBeer();
      socket.emit('noCheers', this.name);
    }

    action () {
      this.addBeer();
      socket.emit('cheers', this.name);
    }

  }

export { housemate };