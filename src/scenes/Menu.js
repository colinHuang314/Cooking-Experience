class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    preload(){
        
    }
    
    create(){
        // background
        this.cameras.main.setBackgroundColor('#D6B687')

        // this.cameras.main.fadeIn(900)

        this.events.on('wake', () => {
            this.cameras.main.fadeIn(900)
        })

        // bg
        this.add.image(0, 0, 'kitchen').setOrigin(0, 0)


        let skipCombo = this.input.keyboard.createCombo('skip', {
            resetOnWrongKey: true,
            maxKeyDelay: 0,
        })
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === skipCombo) {
                for(const [idx, name] of itemsPanel.skipItemNames.entries()){
                    itemsPanel.addItem(itemsPanel.add.image(0, 0, name).setOrigin(0.5), name, itemsPanel.skipItemText[idx])
                }
                this.scene.switch('stoveScene')
                itemsPanel.cameras.main.setVisible(true)
            }   
        })

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
        // this.add.text(game.config.width/2, 40, 'Cooking at Manzanita', titleConfig).setOrigin(0.5)

        // instructions
        this.add.text(game.config.width/2, 40, 'Welcome to the kitchen!', instructionsConfig).setOrigin(0.5)
        instructionsConfig.color = '#e23de2'
        instructionsConfig.fontSize = '28px'
        this.add.text(game.config.width/2, 75, 'Visit each section to learn more, and make a full meal!', instructionsConfig).setOrigin(0.5)
        // instructionsConfig.color = '#e23de2'
        // this.add.text(game.config.width/2, 230, 'and make a full meal!', instructionsConfig).setOrigin(0.5)

        // start combo text (coords are manually tuned)
        const cabinetComboText = new WordCombo(this, 300, 210, 'Cabinet', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('cabinetScene')
                    itemsPanel.cameras.main.setVisible(true)    
                })
            })
        })
        const stoveComboText = new WordCombo(this, 490, 235, 'Stove', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('stoveScene')
                    itemsPanel.cameras.main.setVisible(true)
                })
            })
        })
        const fridgeComboText = new WordCombo(this, 140, 300, 'Fridge', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('fridgeScene')
                    itemsPanel.cameras.main.setVisible(true)  
                })
            })
        })
        const counterComboText = new WordCombo(this, 690, 320, 'Counter', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('counterScene')
                    itemsPanel.cameras.main.setVisible(true)
                    
                })
            })
        })

    
    
        this.input.on('pointerdown', (pointer) => {
            console.log(`menu Pointer down at (${pointer.x}, ${pointer.y})`)
        })

        
        
    }

    update() {
        
    }

}