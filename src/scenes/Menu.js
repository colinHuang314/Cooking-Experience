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

        let instructionsConfig = {
            fontFamily: 'Helvetica',
            fontSize: '35px',
            color: '#0ca946',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#003203',
            strokeThickness: 3,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#000000',
                blur: 0,
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
        
        
        const startComboTextConfig = {
            fontFamily: 'Monospace',
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

        }
        const startComboTextHighlightedConfig = {
            fontFamily: 'Monospace',
            fontSize: '50px',
            color: '#9514ff',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 5,
            shadow: {
                offsetX: 0,
                offsetY: 4,
                color: '#9d14ff',
                blur: 25,
                stroke: false,
                fill: true
            },
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 30,
            },

        }


        // display menu text
        // title
        this.add.text(game.config.width/2, 60, 'Cooking Experience', titleConfig).setOrigin(0.5)

        // instructions
        this.add.text(game.config.width/2, 150, 'Type                to begin', instructionsConfig).setOrigin(0.5)

        // start combo text (coords are manually tuned)
        const startComboText = new WordCombo(this, 325, 149, 'Start', startComboTextConfig, startComboTextHighlightedConfig, () => {this.scene.start('playScene')})
        
        
    }

    update() {
        
    }

}