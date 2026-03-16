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

        this.wordCombos = []

        this.wordLocations = [{x: 526, y: 314}, {x: 354, y: 208}, {x: 133, y: 318}]

        this.events.on('wake', () => {
            this.cameras.main.fadeIn(900)
            this.setWordCombos()
        })

        this.animations = new Animations(this)

        // background
        this.add.image(0, 0, 'counter').setOrigin(0, 0)
        
        // message box
        this.add.rectangle(0, 500, 620, 100, 0x000000, 0.8).setOrigin(0, 0)
      
        // sprites
        this.knife = this.add.image(511, 280, 'knife').setOrigin(0.5)

        // message
        this.message = this.add.text(325, 650, 'The counter is usually filled with\n random stuff and is messy!').setOrigin(0.5).setFontSize(20).setLineSpacing(12)

        // cuttable item words
        this.setWordCombos()

        // scene nav
        const stoveComboText = new WordCombo(this, 320, 480, 'Cabinet', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('cabinetScene')
                })
            })
        })
        const fridgeComboText = new WordCombo(this, 530, 480, 'Stove', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('stoveScene')
                })
            })
        })
        const counterComboText = new WordCombo(this, 100, 480, 'Fridge', defaultTextConfig, defaultTextHighlightedConfig, null,() => {
            this.sound.play('sceneChange', {rate: 0.75})
            this.time.delayedCall(250, () => {
                //wait before switching to play
                this.cameras.main.fadeOut(900)
                this.time.delayedCall(900, () => {
                    this.scene.switch('fridgeScene')
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

        // initial message
        this.animations.messageAnimation(this.message, 10000, () => {
            this.message.setAlpha(1)
            this.message.setY(650)
        })

        this.input.on('pointerdown', (pointer) => {
            console.log(`counter Pointer down at (${pointer.x}, ${pointer.y})`)
        })


    }

    setWordCombos(){
        // remove all previous combos   
        if(this.wordCombos){
            for(const c of this.wordCombos){
                c.quickDestroy()
            }
        }

        this.wordCombos = []

        let items = itemsPanel.getCuttableItems()
        
        for(const [idx, i] of items.entries()){
            // word to put on cutting board
            let comboText = new WordCombo(this, 565, 40 + this.wordCombos.length * 50, i.text, itemTextConfig, itemTextHighlightedConfig, 30, () => {
                comboText.destroy()
                
                // animation
                const newItem = this.add.image(i.item.x, i.item.y, i.name).setOrigin(0.5)
                this.tweens.add({
                    targets: newItem,
                    props: {
                        x: {value: 395 - 70 * idx, duration: 1000, ease: 'linear'},
                        y: {value: 305 + 25 * idx, duration: 1000, ease: 'linear'},
                    },
                    onComplete: () => {
                        // word to cut item
                        let comboText = new WordCombo(this, this.wordLocations[idx].x, this.wordLocations[idx].y, "Cut " + i.text, itemTextConfig, itemTextHighlightedConfig, 30, () => {
                            const slicedItem = this.add.image(395 - 70 * idx, 305 + 25 * idx, i.name + "Sliced").setOrigin(0.5).setVisible(false)

                            this.knifeSound()
                
                            // knife animation
                            this.knifeAnimation(395 - 70 * idx, 305 + 25 * idx, i.name, () => {
                                slicedItem.setVisible(true)
                                newItem.destroy()

                            })
                            comboText.destroy()

                            this.time.delayedCall(1000, () => {
                                // word to pick up sliced item
                                let slicedComboText = new WordCombo(this, this.wordLocations[idx].x, this.wordLocations[idx].y, "Sliced " + i.text, itemTextConfig, itemTextHighlightedConfig, 30, () => {
                                    slicedComboText.destroy()
                                    const [tweenX, tweenY] = itemsPanel.getPosition(itemsPanel.items.length)
                                    this.animations.pickupAnimation(slicedItem, tweenX, tweenY, () => {
                                        const newSlicedItem = itemsPanel.add.image(310, 310, i.name + "Sliced").setOrigin(0.5)
                                        itemsPanel.addItem(newSlicedItem, i.name + "Sliced", 'Sliced ' + i.text)
                                        slicedItem.destroy()
                                    })
                                    
                                })
                            })
                            // cut message
                            this.message.destroy()
                            this.message = this.add.text(325, 650, "Chop Chop Chop").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
                            this.animations.messageAnimation(this.message, 4000, () => {
                                this.message.setAlpha(1)
                                this.message.setY(650)
                            })
                        })
                    }
                })

                itemsPanel.removeItem(i.name)

                // message for putting on board
                this.message.destroy()
                this.message = this.add.text(325, 650, "You put " + i.text + " on the\n cutting board").setOrigin(0.5).setFontSize(20).setLineSpacing(12)
                this.animations.messageAnimation(this.message, 4000, () => {
                    this.message.setAlpha(1)
                    this.message.setY(650)
                })
            })
            this.wordCombos.push(comboText)
        }
    }   

    knifeAnimation(x, y, name, callback){
        this.tweens.add({
            targets: this.knife,
            props: {
                x: {value: x + 40, duration: 300, yoyo: true, ease: 'linear'},
                y: {value: y, duration: 300, yoyo: true, ease: 'Back.easeIn'},
                angle: {value: 20, duration: 150, yoyo: true, ease: 'Sine.easeInOut'}
            },
            onYoyo: () => {
                if(callback) {
                    this.time.delayedCall(210, () => {
                        callback()
                    })
                }
                this.makeCutParticles(x, y, name, "")
            }
        })
    }
    knifeSound(){
        this.sound.play('chopChop')
    }

    makeCutParticles(x, y, name) {
        const emitter = this.add.particles(x, y, name + "Particle", { 
            lifespan: { min: 300, max: 500 }, 
            speedX: { min: -150, max: 150 }, 
            speedY: { min: -200, max: -400 }, 
            gravityY: 800, 
            alpha: { start: 1, end: 0 }, 
            scale: { start: 0.8, end: 0.2 }, 
            emitting: false 
        })
        emitter.explode(15)
    }
}