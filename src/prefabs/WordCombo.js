class WordCombo{
    constructor(scene, x, y, word, config, highlightedConfig, size, onCompleteCallback){
        this.scene = scene
        // calculate centering based on word length and font size (default 45px)
        this.x = x - (word.length - 1) * 0.55 * (size ? size : 45) / 2
        this.y = y
        this.word = word
        this.size = size ? size + 'px' :
        this.highlightedSize = size ? (size + 5) + 'px' : '50px'

        this.config = config !== null ? config : {
            fontFamily: 'Monospace',
            fontSize: this.size,
            color: '#146aff',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#c1e0ff',
            strokeThickness: 2,
            shadow: {
                offsetX: 0,
                offsetY: 4,
                color: '#146aff',
                blur: 25,
                stroke: true,
                fill: true
            },
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 30,
            },
        }
        this.highlightedConfig = highlightedConfig !== null ? highlightedConfig : {
            fontFamily: 'Monospace',
            fontSize: this.highlightedSize,
            color: '#9514ff',
            align: 'center',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 5,
            shadow: {
                offsetX: 0,
                offsetY: 4,
                color: '#9d14ff',
                blur: 25,
                stroke: false,
                fill: true
            },
            padding: {
                left: 30,
                right: 30,
                top: 30,
                bottom: 30,
            },
        }
        
        this.letterTexts = []
        this.currentLetterIndex = 0
        this.onCompleteCallback = onCompleteCallback

        this.destroyed = false
        // create text objects for each letter in the word
        for(let i = 0; i < word.length; i++){
            let letterSpacing = 0.55 * this.config.fontSize.slice(0, 2)
            let letter = word[i]
            let letterText = scene.add.text(this.x + i * letterSpacing, this.y, letter, this.config).setOrigin(0.5)

            // floating animation (phaser examples)
            scene.tweens.add({
                targets: letterText,
                y: letterText.y - 8,
                delay: i * 200, // wiggle effect
                duration: 1600,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.inout'
            })
            this.letterTexts.push(letterText)
        }

        // keyboard logic
        scene.input.keyboard.on('keydown', (event) => {
            if(this.currentLetterIndex >= this.word.length){
                return
            }

            // fixed error where it tried to refrence destroyed (null) 
            if (this.destroyed) return

            // match letter
            if(event.key === "Shift"){
                return
            }
            if(event.key.toLowerCase() === this.word[this.currentLetterIndex].toLowerCase()){
                const letterText = this.letterTexts[this.currentLetterIndex]
                letterText.setStyle(this.highlightedConfig)

                this.currentLetterIndex++

                // word fully typed
                if(this.currentLetterIndex === this.word.length){
                    this.wordComplete()
                }
            }
            else{ // reset if got wrong letter
                this.resetCombo()
            }
        })
    }

    // no highlights, reset to first index
    resetCombo(){
        this.currentLetterIndex = 0
        for(let letterText of this.letterTexts){
            if (this.destroyed) {
                continue
            }
            letterText.setStyle(this.config)
            // restore any visual transforms from completion animation
            letterText.setScale(1)
            letterText.setAlpha(1)
        }
    }

    // complete animation, then callback
    wordComplete(){
        //https://phaser.io/examples/v3.85.0/tweens/view/multiple-delayed-properties and others
        this.scene.tweens.add({
            targets: this.letterTexts,
            scaleX: 1.4,
            scaleY: 1.4,
            alpha: 0.6,
            duration: 220,
            delay: (target, key, value, index) => index * 60,
            yoyo: true,
            ease: 'Sine.inOut',
            onComplete: () => {
                this.onCompleteCallback()

                this.scene.time.delayedCall(1200, () => {
                    this.resetCombo()
                })
            }
        })
    }

    destroy(){
        this.scene.tweens.add({
            targets: this.letterTexts,
            alpha: 0,
            duration: 500,
            ease: 'Linear',
        })
        this.scene.time.delayedCall(500, () => {
            for(let letterText of this.letterTexts){
                letterText.destroy()
            }
            this.destroyed = true
        })
    }

}