class Cabinet extends Phaser.Scene {
    constructor() {
        super("cabinetScene")
    }
    preload() {

    }

    create() {
        console.log("cab create")
        this.cameras.main.setBackgroundColor('#D6B687')
        this.cameras.main.fadeIn(900)
        this.events.on('wake', () => {
            this.cameras.main.fadeIn(900)
        })

        this.animations = new Animations(this)

        // background
        this.add.image(0, 0, 'cabinet').setOrigin(0, 0)

        // testing
        // this.add.particles(150, 300, 'saltParticle', { 
            
        //     lifespan: 700,
        //     speedX: { min: -50, max: 50 },
        //     speedY: { min: 0, max: 100 },
        //     gravityY: 400,
        //     alpha: { start: 1, end: 0 },
        //     scale: { start: 0.5, end: 1 },
        // })

        // message box
        this.add.rectangle(0, 500, 620, 100, 0x000000, 0.8).setOrigin(0, 0)
    
        // sprites
        this.salt = this.add.image(476, 295, 'salt').setOrigin(0.5)
        this.pepper = this.add.image(500, 90, 'pepper').setOrigin(0.5)
        this.chili = this.add.image(250, 230, 'chili').setOrigin(0.5)
        this.garlic = this.add.image(113, 297, 'garlic').setOrigin(0.5)
        this.noodles = this.add.image(276, 97, 'noodles').setOrigin(0.5)
        this.soySauce = this.add.image(102, 98, 'soySauce').setOrigin(0.5)
        

        this.message = this.add.text(325, 650, 'The cabinets contain various ingredients \nshared by my roomates.').setOrigin(0.5).setFontSize(20).setLineSpacing(12)

        // scene nav
        const stoveComboText = new WordCombo(this, 320, 480, 'Stove', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('stoveScene')
                })
            })
        })
        const fridgeComboText = new WordCombo(this, 520, 480, 'Counter', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('counterScene')
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
                    this.scene.switch('menuScene')
                    itemsPanel.cameras.main.setVisible(false)
                })
            })
        })

        // items
        let saltComboText = new WordCombo(this, 476, 335, 'Salt', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            saltComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.salt, tweenX, tweenY, () => {
                let salt = itemsPanel.add.image(310, 310, 'salt').setOrigin(0.5)
                itemsPanel.addItem(salt, "salt")
                this.salt.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, "You got salt! This is used a lot.").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let pepperComboText = new WordCombo(this, 500, 130, 'Pepper', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            pepperComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.pepper, tweenX, tweenY, () => {
                const pepper = itemsPanel.add.image(310, 310, 'pepper').setOrigin(0.5)
                itemsPanel.addItem(pepper, "pepper")
                this.pepper.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, "Pepper! I might use this from time to time.").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let chiliComboText = new WordCombo(this, 250, 270, 'Chili Flakes', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            chiliComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.chili, tweenX, tweenY, () => {
                const chili = itemsPanel.add.image(310, 310, 'chili').setOrigin(0.5)
                itemsPanel.addItem(chili, "chili")
                this.chili.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, "Chili flakes! I use this when I want to \nspice things up.").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let garlicComboText = new WordCombo(this, 113, 335, 'Garlic', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            garlicComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.garlic, tweenX, tweenY, () => {
                const garlic = itemsPanel.add.image(310, 310, 'garlic').setOrigin(0.5)
                itemsPanel.addItem(garlic, "garlic")
                this.garlic.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, "Garlic! Great seasoning for almost anything.").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let noodlesComboText = new WordCombo(this, 276, 135, 'Noodles', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            noodlesComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.noodles, tweenX, tweenY, () => {
                const noodles = itemsPanel.add.image(310, 310, 'noodles').setOrigin(0.5)
                itemsPanel.addItem(noodles, "noodles")
                this.noodles.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, "Noodles are taste good\n and are easy to make").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let soySauceComboText = new WordCombo(this, 102, 135, 'Soy Sauce', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            soySauceComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.soySauce, tweenX, tweenY, () => {
                const soySauce = itemsPanel.add.image(310, 310, 'soySauce').setOrigin(0.5)
                itemsPanel.addItem(soySauce, "soySauce")
                this.soySauce.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, "I started to put soy sauce\n in my meats.").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })


        // initial message
        this.animations.messageAnimation(this.message, 10000, () => {
            this.message.setAlpha(1)
            this.message.setY(650)
        })

        this.input.on('pointerdown', (pointer) => {
            console.log(`cab Pointer down at (${pointer.x}, ${pointer.y})`)
            // const pepper = itemsPanel.add.image(310, 310, 'pepper').setOrigin(0.5)
            // itemsPanel.addItem(pepper, "pepper")
        })


    }

    update() {
    }
}