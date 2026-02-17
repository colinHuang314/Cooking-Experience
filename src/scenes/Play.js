class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor('#D6B687')
        this.cameras.main.fadeIn(900);

    }

    update() {

    }
}