class Fridge extends Phaser.Scene {
    constructor() {
        super("fridgeScene")
    }
    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor('#D6B687')
        this.cameras.main.fadeIn(900)
        this.events.on('wake', () => {
            this.cameras.main.fadeIn(900)
        })

        this.animations = new Animations(this)

        // background
        this.add.image(0, 0, 'fridge').setOrigin(0, 0)
        
        // message box
        this.add.rectangle(0, 500, 620, 100, 0x000000, 0.8).setOrigin(0, 0)

        // sprites
        this.chicken = this.add.image(296, 322, 'chicken').setOrigin(0.5)
        this.groundBeef = this.add.image(425, 237, 'groundBeef').setOrigin(0.5)
        this.carrot = this.add.image(418, 437, 'carrot').setOrigin(0.5)
        this.tomato = this.add.image(550, 335, 'tomato').setOrigin(0.5)

        this.message = this.add.text(325, 650, 'The fridge is usually packed with food\n from costco!').setOrigin(0.5).setFontSize(20).setLineSpacing(12)

        // scene nav
        const stoveComboText = new WordCombo(this, 100, 480, 'Cabinet', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('cabinetScene')
                })
            })
        })
        const fridgeComboText = new WordCombo(this, 520, 480, 'Counter', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('counterScene')
                })
            })
        })
        const counterComboText = new WordCombo(this, 320, 480, 'Stove', defaultTextConfig, defaultTextHighlightedConfig, null,() => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('stoveScene')
                })
            })
        })

        const menuComboText = new WordCombo(this, 60, 30, 'Menu', menuTextConfig, menuTextHighlightedConfig, null,() => {
            this.sound.play('sceneChange', {rate: 0.75})
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
        let chickenComboText = new WordCombo(this, 296, 360, 'Chicken', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            chickenComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.chicken, tweenX, tweenY, () => {
                const chicken = itemsPanel.add.image(310, 310, 'chicken').setOrigin(0.5)
                itemsPanel.addItem(chicken, 'chicken', "Chicken")
                this.chicken.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, 'Chicken is harder for me to make.').setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let groundBeefComboText = new WordCombo(this, 425, 267, 'Ground Beef', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            groundBeefComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.groundBeef, tweenX, tweenY, () => {
                const groundBeef = itemsPanel.add.image(310, 310, 'groundBeef').setOrigin(0.5)
                itemsPanel.addItem(groundBeef, 'groundBeef', 'Ground Beef')
                this.groundBeef.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, 'Ground beef is easy to make.').setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let carrotComboText = new WordCombo(this, 418, 405, 'Carrot', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            carrotComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.carrot, tweenX, tweenY, () => {
                const carrot = itemsPanel.add.image(310, 310, 'carrot').setOrigin(0.5)
                itemsPanel.addItem(carrot, 'carrot', 'Carrot')
                this.carrot.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, 'Carrots are tasty and add crunch...\nI also need to eat more veggies. ').setOrigin(0.5).setFontSize(20).setLineSpacing(12)
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let tomatoComboText = new WordCombo(this, 550, 305, 'Tomato', itemTextConfig, itemTextHighlightedConfig, 30, () => {
            tomatoComboText.destroy()
            const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
            this.animations.pickupAnimation(this.tomato, tweenX, tweenY, () => {
                const tomato = itemsPanel.add.image(310, 310, 'tomato').setOrigin(0.5)
                itemsPanel.addItem(tomato, 'tomato', 'Tomato')
                this.tomato.destroy()
            })
            this.message.destroy()
            this.message = this.add.text(325, 650, 'Maybe I want a tomato? Sometimes I eat them raw.').setOrigin(0.5).setFontSize(20).setLineSpacing(12)
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

    }

    update() {
    }
}