class Cabinet extends Phaser.Scene {
    constructor() {
        super("cabinetScene")
    }
    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor('#D6B687')
        this.cameras.main.fadeIn(900);

        this.animations = new Animations(this)

        // message box
        this.add.rectangle(0, 500, 620, 100, 0x000000, 0.4).setOrigin(0, 0)
        this.scene.launch('itemsPanelScene');
        this.itemsPanel = this.scene.get('itemsPanelScene');

        // sprites
        this.salt = this.add.rectangle(310, 310, 50, 50, 0xffffff).setOrigin(0.5)// temp salt
        this.pepper = this.add.rectangle(410, 310, 50, 50, 0x555555).setOrigin(0.5)// temp pepper
        this.chili = this.add.rectangle(370, 210, 50, 50, 0xff4412).setOrigin(0.5)// temp chili
        

        this.message = this.add.text(325, 650, 'The cabinets contain various ingredients \nshared by my roomates.').setOrigin(0.5).setFontSize(20).setLineSpacing(12)

        // scene nav
        const stoveComboText = new WordCombo(this, 80, 220, 'Stove', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('stoveScene')
                })
            })
        })
        const fridgeComboText = new WordCombo(this, 690, 220, 'Counter', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('counterScene')
                })
            })
        })
        const counterComboText = new WordCombo(this, 310, 460, 'Fridge', null, null, null,() => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('fridgeScene')
                })
            })
        })

        // items
        let saltComboText = new WordCombo(this, 350, 360, 'Salt', null, null, 30, () => {
            saltComboText.destroy()
            this.animations.pickupAnimation(this.salt, 700, 450,() => {
                const salt = this.itemsPanel.add.rectangle(310, 310, 50, 50, 0xffffff).setOrigin(0.5)
                this.itemsPanel.addItem(salt)
            })
            this.message.text = "You got salt! This is used a lot."
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })

        })
        let pepperComboText = new WordCombo(this, 450, 360, 'Pepper', null, null, 30, () => {
            pepperComboText.destroy()
            this.animations.pickupAnimation(this.pepper, 700, 450,() => {
                const pepper = this.itemsPanel.add.rectangle(310, 310, 50, 50, 0x555555).setOrigin(0.5)
                this.itemsPanel.addItem(pepper)
            })
            this.message.text = "Pepper! I might use this from time to time."
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })
        let chiliComboText = new WordCombo(this, 410, 260, 'Chili', null, null, 30, () => {
            chiliComboText.destroy()
            this.animations.pickupAnimation(this.chili, 700, 450,() => {
                const chili = this.itemsPanel.add.rectangle(310, 310, 50, 50, 0xff4412).setOrigin(0.5)
                this.itemsPanel.addItem(chili)
            })
            this.message.text = "Chili pepper! I use this when I want to \nspice things up."
            this.animations.messageAnimation(this.message, 4000, () => {
                this.message.setAlpha(1)
                this.message.setY(650)
            })
        })


        // initial message
        this.animations.messageAnimation(this.message, 3000, () => {
            this.message.setAlpha(1)
            this.message.setY(650)
        })


        this.input.on('pointerdown', () => {
            const apple = this.itemsPanel.add.image(0, 0, 'apple').setOrigin(0.5).setScale(1);
            this.itemsPanel.addItem(apple);
        });

    }

    update() {

    }
}