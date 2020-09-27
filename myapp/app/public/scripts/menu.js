class menu {
    constructor(selector, content) {
        this.selector = selector;
        this.menuLenght = content.length;
        this.content = content;
        this.clear();
      }

    updateContent (content) {
        this.selector = 0;
        this.content = content;
        this.menuLenght = content.length;
        this.clear();
        this.fillFirstColumn();
        this.fillBeerCounter();
        this.fillBeerVisual();
        this.lineSelect();

    }

    selectorUp () {
        if (this.selector < (this.menuLenght - 1)) {
            this.lineDeselect();
            this.selector ++;
            this.lineSelect();
        }
        }
    selectorDown () {
        if (this.selector > 0) {
            this.lineDeselect();
            this.selector --;
            this.lineSelect();
        }
    }
    click () {
        this.content[this.selector].action();
    }

    addBeer () {
        housemate = this.content[selector];

    }

    clear () {
        $('#mainMenu').empty()
        $('#beerCounter').empty()
        $('#beerVisual').empty()
    }

    initiateBeerView () {
        this.fillFirstColumn();
        this.fillBeerCounter();
        this.fillBeerVisual();
    }

    fillFirstColumn () {
        this.content.forEach( function(object) {
            $('#mainMenu').append('<li>'+object.name+'</li>');
        });
        $('#mainMenu').children().addClass("menuItem");
    }
    
    fillBeerCounter () {
        if (this.content[0].beerCount > -1) {
            this.content.forEach( function(object) {
                $('#beerCounter').append('<li>'+object.beerCount+'</li>');
            });
            $('#beerCounter').children().addClass("menuItem");
        }
    }

    fillBeerVisual () {
        if (this.content[0].visualBeer) {
            this.content.forEach( function(object) {
                $('#beerVisual').append('<li>'+object.visualBeer+'</li>');
            });
            $('#beerVisual').children().addClass("menuItem");
        }
    }

    lineSelect () {
        var selectorString = "#mainMenu li:nth-child(" + (this.selector +1)+ ")";
        $(selectorString).attr( "class", "selectedMenuitem" );
    }

    lineDeselect () {
        var selectorString = "#mainMenu li:nth-child(" + (this.selector +1)+ ")";
        $(selectorString).attr( "class", "menuItem" );
    }

    updateMyBeer () {
        var selectorString = "#beerCounter li:nth-child(" + (this.selector +1)+ ")";
        $(selectorString).text(this.content[this.selector].beerCount);
        var selectorString = "#beerVisual li:nth-child(" + (this.selector +1)+ ")";
        $(selectorString).text(this.content[this.selector].visualBeer);
    }

    }


export { menu };