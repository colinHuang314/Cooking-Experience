class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    preload(){
        
    }
    
    create(){
        // background
        this.cameras.main.setBackgroundColor('#D6B687')
        this.cameras.main.fadeIn(900);

        // text configs
        let titleConfig = {
            fontFamily: 'Helvetica',
            fontSize: '70px',
            color: '#e19823',
            align: 'center',
            stroke: '#c9aa55',
            strokeThickness: 6,
            shadow: {
                offsetX: 0,
                offsetY: 10,
                color: '#4f504b',
                blur: 15,
                stroke: true,
                fill: false
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
        

        // add sprites
        this.pot = this.add.image(300, 400, 'pot').setOrigin(0.5)
        this.apple = this.add.image(300, 300, 'apple').setOrigin(0.5)

        //this.add.rectangle(300,400, 200, 120, 0x000000).setOrigin(0.5)

        // display menu text
        // title
        this.add.text(game.config.width/2, 60, 'Cooking at Manzanita', titleConfig).setOrigin(0.5)

        // instructions
        this.add.text(game.config.width/2, 150, 'Type                to begin', instructionsConfig).setOrigin(0.5)

        // start combo text (coords are manually tuned)
        const startComboText = new WordCombo(this, 325, 149, 'Start', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('cabinetScene')
                })
            })
        })

    
    
        
        
    }

    update() {
        
    }

}