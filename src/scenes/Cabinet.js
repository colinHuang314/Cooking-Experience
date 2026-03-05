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

        this.add.rectangle(0, 500, 620, 100, 0x000000, 0.4).setOrigin(0, 0) // messages
        this.scene.launch('itemsPanelScene');
        this.itemsPanel = this.scene.get('itemsPanelScene');

        this.salt = this.add.rectangle(310, 310, 50, 50, 0xffffff).setOrigin(0.5)


        this.message = this.add.text(275, 650, 'Type a word to begin').setOrigin(0.5).setFontSize(25).setLineSpacing(12)

        const stoveComboText = new WordCombo(this, 350, 40, 'Stove', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('stoveScene')

                })
            })
        })
        const fridgeComboText = new WordCombo(this, 650, 220, 'Fridge', null, null, null, () => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('fridgeScene')

                })
            })
        })
        const counterComboText = new WordCombo(this, 310, 460, 'Counter', null, null, null,() => {
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => {
                    this.scene.start('counterScene')

                })
            })
        })

        let saltComboText = new WordCombo(this, 350, 360, 'Salt', null, null, 30, () => {
            saltComboText.destroy()
            this.animations.pickupAnimation(this.salt, 700, 450,() => {console.log('picked up salt')})
        })


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