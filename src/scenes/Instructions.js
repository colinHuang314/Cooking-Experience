class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene")
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000')
        this.cameras.main.fadeIn(900)

        this.letter = this.add.image(-100, 300, 'letterFront').setOrigin(0.5).setScale(0.08).setAlpha(0).setAngle(-10)

        this.soundPlaying = false


        this.messageConfig = {
            fontFamily: 'Helvetica',
            fontSize: '40px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center',
            wordWrap: { width: game.config.width - 100 }
        }

        // messages and combos are parralel
        this.messages = [
            "For Mom",
            "For this Playable Postcard, all you need to do is type the floating words!",
            "Greetings from UCSC!",
            "I've been cooking my own food! It's not as good as when you make it ...",
            "Here's a little insight into how I make my meals.",
        ]

        this.myTweens = [
            { // dummy
                targets: this.letter,
                props: {
                    x: {value: -100, duration: 1000, ease: 'Sine.easeInOut'},                    
                }
            },
            {
                targets: this.letter,
                props: {
                    x: {value: 200, duration: 3000, ease: 'Sine.easeInOut'},
                    y: {value: 100, duration: 3000, ease: 'Sine.easeInOut'},
                    scaleX: {value: 0.12, duration: 3000, ease: 'Sine.easeInOut'},
                    scaleY: {value: 0.12, duration: 3000, ease: 'Sine.easeInOut'},
                    alpha: {value: 0.5, duration: 3000, ease: 'Sine.easeInOut'},
                    angle: {value: 10, duration: 2600, ease: 'Sine.easeInOut'},
                }
            },
            {
                targets: this.letter,
                props: {
                    x: {value: 120, duration: 3000, ease: 'Sine.easeInOut'},
                    y: {value: 450, duration: 3000, ease: 'Sine.easeInOut'},
                    scaleX: {value: 0.18, duration: 3000, ease: 'Sine.easeInOut'},
                    scaleY: {value: 0.18, duration: 3000, ease: 'Sine.easeInOut'},
                    alpha: {value: 0.7, duration: 3000, ease: 'Sine.easeInOut'},
                    angle: {value: -7, duration: 2600, ease: 'Sine.easeInOut'},
                }
            },
            {
                targets: this.letter,
                props: {
                    x: {value: 600, duration: 3000, ease: 'Sine.easeInOut'},
                    y: {value: 100, duration: 3000, ease: 'Sine.easeInOut'},
                    scaleX: {value: 0.22, duration: 3000, ease: 'Sine.easeInOut'},
                    scaleY: {value: 0.22, duration: 3000, ease: 'Sine.easeInOut'},
                    alpha: {value: 0.9, duration: 3000, ease: 'Sine.easeInOut'},
                    angle: {value: 8, duration: 2600, ease: 'Sine.easeInOut'},
                }
            },
            {
                targets: this.letter,
                props: {
                    x: {value: 650, duration: 3000, ease: 'Sine.easeInOut'},
                    y: {value: 450, duration: 3000, ease: 'Sine.easeInOut'},
                    scaleX: {value: 0.26, duration: 3000, ease: 'Sine.easeInOut'},
                    scaleY: {value: 0.26, duration: 3000, ease: 'Sine.easeInOut'},
                    alpha: {value: 1, duration: 3000, ease: 'Sine.easeInOut'},
                    angle: {value: -7, duration: 2600, ease: 'Sine.easeInOut'},
                }
            }
        ]
        this.comboWords = [null, "Type This", "Next", "Next", "Begin"]

        this.currentIndex = 0
        this.textObjects = { main: null, combo: null }

        this.showMessage(this.currentIndex)


        // altice lowkey repo
        let skipCombo = this.input.keyboard.createCombo('skip', {
            resetOnWrongKey: true,
            maxKeyDelay: 0,
        })
        this.input.keyboard.on('keycombomatch', (combo, event) => {
            if (combo === skipCombo) {
                this.scene.switch('menuScene')
                if (! this.soundPlaying){
                    this.sound.play('music', { loop: true, volume: 0.4 })
                    this.soundPlaying = true
                }
            }   
        })
    }

    showMessage(index) {
        // clear previous
        if (this.textObjects.main) {
            this.textObjects.main.destroy()
        }
        if (this.textObjects.combo) {
            // wordcombo has its own destroy animation, so just kill it immediately
            this.textObjects.combo.destroy()
            this.textObjects.combo = null
        }

        const msg = this.messages[index]
        this.textObjects.main = this.add.text(width / 2, height / 2, msg, this.messageConfig).setOrigin(0.5).setAlpha(0)

        // fade the main message in
        this.tweens.add({
            targets: this.textObjects.main,
            alpha: 1,
            duration: 800,
            onComplete: () => {
                if (this.currentIndex === 0) { // first one
                    this.tweens.add({
                        targets: this.textObjects.main,
                        alpha: 0,
                        duration: 800,
                        delay: 1500,
                        onComplete: () => {
                            this.currentIndex++
                            this.showMessage(this.currentIndex)
                        }
                    })
                }
                else {
                    // wait to show combo
                    this.time.delayedCall(500, () => {
                        this.createCombo(index)
                    })
                }
            }
        })

        // play letter animation
        this.tweens.add(this.myTweens[index])

        if (index === 1){
            this.time.delayedCall(1100, () => {
                this.sound.play('wind', {volume: 0.3})
            })
        }
        else if(index > 1){
            this.time.delayedCall(500, () => {
                this.sound.play('wind')
            })
        }

    }

    createCombo(index) {
        const label = this.comboWords[index]
        this.textObjects.combo = new WordCombo(this, width / 2, height / 2 + 120, label, null, null, null, () => {
                // audio on first key press
                if (index == 1) {
                    if (! this.soundPlaying){
                        this.sound.play('music', { loop: true, volume: 0.4 })
                        this.soundPlaying = true
                    }
                }
                // fade out the main message when typed
                this.tweens.add({
                    targets: this.textObjects.main,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        if (index + 1 < this.messages.length) {
                            // next message
                            this.currentIndex = index + 1
                            this.showMessage(this.currentIndex)
                        } else {
                            // last message
                            this.finalAnimation()
                        }
                    }
                })
                if (this.textObjects.combo) {
                    // .destroy() animates itself
                    this.textObjects.combo.destroy()
                    this.textObjects.combo = null
                }
            }
        )

        // combo starts invisible then fades in
        if (this.textObjects.combo && this.textObjects.combo.letterTexts) {
            for (let lt of this.textObjects.combo.letterTexts) {
                lt.setAlpha(0)
            }
            this.tweens.add({
                targets: this.textObjects.combo.letterTexts,
                alpha: 1,
                duration: 600,
                ease: 'Linear',
            })
        }
    }

    finalAnimation(){
        this.tweens.add({
            targets: this.letter,
            props: {
                x: {value: 400, duration: 3000, ease: 'Sine.easeInOut'},
                y: {value: 300, duration: 3000, ease: 'Sine.easeInOut'},
                scaleX: {value: 1, duration: 3000, ease: 'Sine.easeInOut'},
                scaleY: {value: 1, duration: 3000, ease: 'Sine.easeInOut'},
                alpha: {value: 1, duration: 3000, ease: 'Sine.easeInOut'},
                angle: {value: 0, delay: 2000, duration: 1000, ease: 'Sine.easeInOut'},
            },
            onComplete: () => this.finalAnimationStep2()
        })
        this.sound.play('wind', { detune: -1200})
    }
    // flip over
    finalAnimationStep2() {
        this.sound.play('wind', { detune: -1200})
        this.tweens.add({
            targets: this.letter,
            props: {
                scaleX: {value: 0, duration: 1000, ease: 'Sine.easeInOut'},
            },
            onComplete: () => this.finalAnimationStep3()
        })
    }

    // flip over
    finalAnimationStep3() {
        this.sound.play('wind', { detune: -2400})
        
        this.letter.destroy()
        this.menuSS = this.add.image(width * 0.5, height * 0.5, 'menuSS').setOrigin(0.5).setScale(0, 1)

        this.tweens.add({
            targets: this.menuSS,
            props: {
                scaleX: {value: 1, duration: 1000, ease: 'Sine.easeInOut'},
            },
            onComplete: () => this.finalAnimationStep4()
        })
    }

    finalAnimationStep4() {
        this.scene.switch('menuScene')
    }

    update() {
    }
}

