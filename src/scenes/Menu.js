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
        // this.pot = this.add.image(300, 400, 'pot').setOrigin(0.5)
        // this.apple = this.add.image(300, 300, 'apple').setOrigin(0.5)

        //this.add.rectangle(300,400, 200, 120, 0x000000).setOrigin(0.5)

        // display menu text
        // title
        this.add.text(game.config.width/2, 60, 'Cooking at Manzanita', titleConfig).setOrigin(0.5)

        // instructions
        this.add.text(game.config.width/2, 150, 'Welcome to the kitchen!', instructionsConfig).setOrigin(0.5)

        // start combo text (coords are manually tuned)
        const cabinetComboText = new WordCombo(this, 700, 370, 'Cabinet', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('cabinetScene')
                })
            })
        })
        const stoveComboText = new WordCombo(this, 400, 220, 'Stove', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('stoveScene')
                })
            })
        })
        const fridgeComboText = new WordCombo(this, 100, 370, 'Fridge', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('fridgeScene')
                })
            })
        })
        const counterComboText = new WordCombo(this, 400, 570, 'Counter', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('counterScene')
                })
            })
        })

    
    
        
        
    }

    update() {
        
    }

}