class Stove extends Phaser.Scene {
    constructor() {
        super("stoveScene")
    }
    preload() {

    }

    create() {
        console.log("stove create")
        this.cameras.main.setBackgroundColor('#D6B687')
        this.cameras.main.fadeIn(900)

        this.wordCombos = []
        this.itemsInPot = []
        this.startedCook = false

        this.events.on('wake', () => {
            this.cameras.main.fadeIn(900)
            if(itemsPanel.hasAllIngredients()){
                this.warningText.destroy()
            }
            this.setWordCombos()
        })

        this.animations = new Animations(this)

        // background
        this.add.image(0, 0, 'stove').setOrigin(0, 0)
        

        // message box
        this.add.rectangle(0, 500, 620, 100, 0x000000, 0.8).setOrigin(0, 0)


        let warningConfig = {
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
        // warning message
        this.warningText = this.add.text(game.config.width/2, 130, 'Collect more ingredients before cooking!', warningConfig).setOrigin(0.5)
        if(itemsPanel.hasAllIngredients()){
            this.warningText.destroy()
        }

        // skip
        let skipCombo = this.input.keyboard.createCombo('skip', {
            resetOnWrongKey: true,
            maxKeyDelay: 0,
        })
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === skipCombo) {
                this.finishAnimation()
            }
        })

        // wordcombos
        this.setWordCombos()


        // sprites
        this.pot = this.add.image(313, 355, 'pot').setOrigin(0.5)

        this.message = this.add.text(325, 650, 'Put ingredients together to make a meal!\nDon\'t forget to cut your veggies!').setOrigin(0.5).setFontSize(20).setLineSpacing(12)

        // scene nav
        const stoveComboText = new WordCombo(this, 300, 480, 'Cabinet', defaultTextConfig, defaultTextHighlightedConfig, null, () => {
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
        const counterComboText = new WordCombo(this, 80, 480, 'Fridge', defaultTextConfig, defaultTextHighlightedConfig, null,() => {
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
            console.log(`stove Pointer down at (${pointer.x}, ${pointer.y})`)
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

        if(!itemsPanel.hasAllIngredients(this.itemsInPot)){
            return
        }

        for(const [idx, item] of itemsPanel.items.entries()){
            const rawVeg = ['tomato', 'carrot', 'garlic']

            if(rawVeg.includes(item.name)){
                continue
            }
            let x = (idx < 5) ? 110 : 520
            let y = 180 + (idx % 5) * 45

            let comboText = new WordCombo(this, x, y, item.text, itemTextConfig, itemTextHighlightedConfig, 30, () => {
                comboText.destroy()
                itemsPanel.removeItem(item.name)

                const newItem = this.add.image(item.item.x, item.item.y, item.name).setOrigin(0.5)

                if(itemsPanel.seasoning.includes(item.name)){
                    this.time.delayedCall(500, () => {
                        this.sound.play('threeShake', {volume: 3})
                    })
                }
                this.tweens.add({
                    targets: newItem,
                    props: {
                        x: {value: this.pot.x, duration: 1000, ease: 'linear'},
                        y: {value: this.pot.y, duration: 1000, ease: 'Back.easeIn'},
                        alpha: {value: 0.2, duration: 1000, ease: 'Circ.easeIn'},
                        scale: {value: 1.3, duration: 1000, ease: 'linear'}
                    },
                    onComplete: () => {
                        if(itemsPanel.main.includes(item.name)){
                            this.sound.play('bigSplash')
                        }
                        else if(itemsPanel.seasoning.includes(item.name)){
                            
                        }
                        else{
                            this.sound.play('smallSplash')
                        }
                        const splashEmmiter = this.add.particles(this.pot.x, this.pot.y, "saltParticle", { 
                            angle: { min: 230, max: 310 },
                            lifespan: { min: 600, max: 900 }, 
                            gravityY: 800,
                            speed: {min: 250, max: 450},
                            alpha: { start: 0.7, end: 0 }, 
                            scale: { start: 0.8, end: 0.1 }, 
                            tint: [ 0x00aaff, 0x44ccff ],
                            emitting: false 
                        })
                        splashEmmiter.explode(30)

                        newItem.destroy()
                        this.itemsInPot.push(item)
                        if(this.checkStartCook() && !this.startedCook){
                            this.time.delayedCall(1000, () => {
                                this.startCook()
                                this.startedCook = true
                            })
                        }
                    }
                })
            })
            this.wordCombos.push(comboText)
        }
    }

    // when enough items in pot, begin sequence of stiring and waiting and then conclusion
    checkStartCook(){
        let hasMain = false
        let hasVeg = false
        let hasSeasoning = false
        for(const item of this.itemsInPot){
            if(itemsPanel.main.includes(item.name)){
                hasMain = true
            }
            if(itemsPanel.vegetable.includes(item.name)){
                hasVeg = true
            }
            if(itemsPanel.seasoning.includes(item.name)){
                hasSeasoning = true
            }
        }

        return (hasMain && hasVeg && hasSeasoning)
    }

    // begin sequence of stiring and waiting and then finish
    startCook(){
        this.sound.play('oneNoteC', {detune: -1200})
        let stirText = new WordCombo(this, 335, 270, "Stir", specialTextConfig, specialTextHighlightedConfig, null, () => {
            stirText.destroy()
            this.time.delayedCall(2000, () => {
                this.sound.play('oneNoteC', {detune: -1200})
                let waitText = new WordCombo(this, 335, 270, "Wait...", specialTextConfig, specialTextHighlightedConfig, null, () => {
                    waitText.destroy()
                    this.time.delayedCall(4000, () => {
                        this.sound.play('oneNoteC', {detune: -1200})
                        let stirText = new WordCombo(this, 335, 270, "Stir", specialTextConfig, specialTextHighlightedConfig, null, () => {
                            stirText.destroy()
                                this.time.delayedCall(2000, () => {
                                    this.sound.play('oneNoteC', {detune: 0})
                                    let finishText = new WordCombo(this, 335, 270, "Finish", specialTextConfig, specialTextHighlightedConfig, null, () => {
                                        finishText.destroy()
                                        this.finishAnimation()
                                    })
                                })

                        })
                    })

                })
            })

        })

    }

    finishAnimation(){
        this.sound.play('mealComplete')
        const starEmitter = this.add.particles(this.pot.x, this.pot.y, "starParticle", { 
            lifespan: { min: 500, max: 750 }, 
            speed: {min: 200, max: 350},
            alpha: { start: 1, end: 0 }, 
            scale: { start: 1, end: 0.5 }, 
            emitting: false 
        })
        this.pot.setDepth(10)

        this.tweens.add({
            targets: this.pot,
            props: {
                alpha: {value: 0.5, duration: 900, yoyo: true, ease: 'Circ.easeIn'},
                scale: {value: 1.4, duration: 900, yoyo: true, ease: 'Sine.easeInOut'}
            },
            onStart: () => {
                starEmitter.explode(70)
            },
            onYoyo: () => {
                starEmitter.explode(80)
            },
            onComplete: () => {
                starEmitter.explode(90)
                this.time.delayedCall(250, () => {
                    this.scene.launch('endingScene')
                    itemsPanel.cameras.main.fadeOut(1500)
                    this.cameras.main.fadeOut(1500)
                })


            }
        })
    }
}   