class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene")
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000')
        this.cameras.main.fadeIn(900)

        this.messageConfig = {
            fontFamily: 'Helvetica',
            fontSize: '40px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: game.config.width - 100 }
        }

        // messages and combos are parralel
        this.messages = [
            "For Mom",
            "For this Playable Postcard, all you need to do is type the floating words!",
            "Greetings from UCSC!",
            "I've been cooking my own food! It's not as good as when you make it ...",
            "Here's a little insight into how I make my meals."
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
                if (this.currentIndex == 0) {
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
    }

    createCombo(index) {
        const label = this.comboWords[index]
        this.textObjects.combo = new WordCombo(this, width / 2, height / 2 + 120, label, null, null, null, () => {
                // audio on first key press
                if (index == 1) {
                    this.sound.play('music', { loop: true })
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
                            this.cameras.main.fadeOut(900)
                            this.time.delayedCall(500, () => {
                                this.scene.switch('menuScene')
                            })
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

    update() {
    }
}
