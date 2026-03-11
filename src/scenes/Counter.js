class Counter extends Phaser.Scene {
    constructor() {
        super("counterScene")
    }
    preload() {

    }

    create() {
        console.log("counter create")
        this.cameras.main.setBackgroundColor('#D6B687')
        this.cameras.main.fadeIn(900)
        this.events.on('wake', () => {
            this.cameras.main.fadeIn(900)
        })

        this.animations = new Animations(this)

        // background
        this.add.image(0, 0, 'counter').setOrigin(0, 0)
        

        // message box
        this.add.rectangle(0, 500, 620, 100, 0x000000, 0.8).setOrigin(0, 0)
        
        // item panel
        // this.scene.wake('itemsPanelScene')


        // sprites
        // this.salt = this.add.image(476, 295, 'salt').setOrigin(0.5)


        this.message = this.add.text(325, 650, 'The counter is usually filled with\n random stuff and is messy!').setOrigin(0.5).setFontSize(20).setLineSpacing(12)

        // scene nav
        const stoveComboText = new WordCombo(this, 320, 480, 'Cabinet', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('cabinetScene')
                })
            })
        })
        const fridgeComboText = new WordCombo(this, 520, 480, 'Stove', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('stoveScene')
                })
            })
        })
        const counterComboText = new WordCombo(this, 100, 480, 'Fridge', defaultTextConfig, defaultTextHighlightedConfig, null,() => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('fridgeScene')
                })
            })
        })

        const menuComboText = new WordCombo(this, 60, 30, 'Menu', menuTextConfig, menuTextHighlightedConfig, null,() => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.start('menuScene')
                    itemsPanel.cameras.main.setVisible(false)
                })
            })
        })

        // items
        // let saltComboText = new WordCombo(this, 476, 335, 'Salt', itemTextConfig, itemTextHighlightedConfig, 30, () => {
        //     saltComboText.destroy()
        //     this.animations.pickupAnimation(this.salt, 700, 450,() => {
        //         const salt = this.itemsPanel.add.image(310, 310, 'salt').setOrigin(0.5)
        //         this.itemsPanel.addItem(salt, "salt")
        //     })
        //     this.message.destroy()
        //     this.message = this.add.text(325, 650, "You got salt! This is used a lot.").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
        //     this.animations.messageAnimation(this.message, 4000, () => {
        //         this.message.setAlpha(1)
        //         this.message.setY(650)
        //     })
        // })
        

        // initial message
        this.animations.messageAnimation(this.message, 4000, () => {
            this.message.setAlpha(1)
            this.message.setY(650)
        })

        this.input.on('pointerdown', (pointer) => {
            console.log(`counter Pointer down at (${pointer.x}, ${pointer.y})`)
        })


    }

    update() {
    }
}