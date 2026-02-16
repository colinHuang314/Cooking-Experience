class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    preload(){
        
    }
    
    create(){
        // background
        this.cameras.main.setBackgroundColor('#D6B687')

        // text configs
        let titleConfig = {
            fontFamily: 'Helvetica',
            fontSize: '70px',
            color: '#f6ff00',
            align: 'center',
            stroke: '#141414',
            strokeThickness: 12,
            shadow: {
                offsetX: 0,
                offsetY: 10,
                color: '#4f504b',
                blur: 15,
                stroke: true,
                fill: true
            },
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 25,
            },
        }

        
        // display menu text
        // title
        this.add.text(game.config.width/2, 60, 'Cooking Experience', titleConfig).setOrigin(0.5)

        // instructions
        this.add.text(game.config.width/2, 150, 'Type             to begin', {
            fontFamily: 'Helvetica',
            fontSize: '35px',
            color: '#00c448',
            align: 'center',
        }).setOrigin(0.5)

        // start text (uses manully tuned coordinates)
        let startText = this.add.text(377, 155, 'start', {
            fontFamily: 'Caveat',
            fontSize: '45px',
            color: '#146aff',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#c1e0ff',
            strokeThickness: 2,
            shadow: {
                offsetX: 0,
                offsetY: 4,
                color: '#146aff',
                blur: 25,
                stroke: true,
                fill: true
            },
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 30,
            },
        }).setOrigin(0.5)

        // floating animation (phaser examples)
        this.tweens.add({
            targets: startText,
            y: startText.y - 8,
            duration: 1600,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inout'
        })

    
        //audio
        // this.selectSound = this.sound.add('selectSound', {volume: 0.25})




        // keyboard combos (prof. altice)
        let startCombo = this.input.keyboard.createCombo('start', {
            resetOnWrongKey: true,  // if they press the wrong key is the combo reset?
            maxKeyDelay: 0,         // max delay (ms) between each key press (0 = disabled)
            resetOnMatch: true,     // if matched before, does pressing first key of combo reset?
            deleteOnMatch: false    // if combo matches, will it delete itself?
        })
        
        // watch for keycombomatches
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === startCombo) { 
                console.log('start combo matched')
                this.scene.start('playScene')
            }
        })

    }

    update() {
        
    }

}