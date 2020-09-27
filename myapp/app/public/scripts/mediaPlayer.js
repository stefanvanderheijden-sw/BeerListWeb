class mediaPlayer {
    constructor(audioObjects) {
        this.audioFiles = audioObjects;
        this.lastPlayed = audioObjects[0];
    }

    playTune () {
        this.lastPlayed.pause();
        var dice = parseInt(Math.random() * this.audioFiles.length);
        console.log(dice);
        this.audioFiles[dice].play();
    }
}

export {mediaPlayer};