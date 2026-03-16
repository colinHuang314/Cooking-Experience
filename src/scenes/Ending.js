/*
hearts come out of the pot,
messages are faded in and out like the intro to say nice things

text appears "press spacebar to restart"
the pot moves to the left and smaller, and the spacebar text under it and smaller
 credits start scrolling up on the right side of the screen.
 random foods come up every 5 lines anda are thrown in the pot 
 start emmiter at the end
*/

class Ending extends Phaser.Scene {
    constructor() {
        super("endingScene")
    }

    preload() {
    }

    create() {
        console.log("ending create")

        this.restartTextConfig = {
            fontFamily: 'Helvetica',
            fontSize: '40px',
            color: '#ffa3c5',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center',
        }

        this.box = this.add.rectangle(400, 0, 600, 150, 0x000000)
        this.box.setDepth(10)

        this.pot = this.add.image(313, 355, 'pot').setOrigin(0.5)

        this.time.delayedCall(2000, () => {
            this.centerPot()
        })


    }

    update() {

    }

    centerPot(){
        this.tweens.add({
            targets: this.pot,
            props: {
                x: {value: 400, duration: 2000, ease: 'Sine.easeInOut'},
                y: {value: 300, duration: 2000, ease: 'Sine.easeInOut'},
                scaleX: {value: 1.5, duration: 2000, ease: 'Sine.easeInOut'},
                scaleY: {value: 1.5, duration: 2000, ease: 'Sine.easeInOut'},
            },
            onComplete: () => {
                this.potFront = this.add.image(405, 300, 'potFront').setOrigin(0.5).setScale(0.67)
                this.startHearts()
            }
        })
    }

    startHearts(){
        const heartEmmiter = this.add.particles(this.pot.x, this.pot.y, "heart", { 
            angle: { min: 220, max: 320 },
            lifespan: { min: 2000, max: 3500 }, 
            gravityY: 20,
            speed: {min: 90, max: 130},
            alpha: { start: 0.7, end: 0 }, 
            scale: { start: 3, end: 1 }, 
            quantity: 3,
            frequency: 200,     
            emitting: true 
        })
        this.potFront.setDepth(10)

        this.time.delayedCall(3500, () => {
            heartEmmiter.stop()

            this.time.delayedCall(2000, () => {
                this.movePotDown()
            })
            
        })
    }

    movePotDown(){
        this.tweens.add({
            targets: this.pot,
            props: {
                y: {value: 530, duration: 2000, ease: 'Sine.easeInOut'},
                scaleX: {value: 1.8, duration: 2000, ease: 'Sine.easeInOut'},
                scaleY: {value: 1.8, duration: 2000, ease: 'Sine.easeInOut'},

            },
            onComplete: () => {
                this.enterRestartText()
            }
        })
        this.tweens.add({
            targets: this.potFront,
            props: {
                y: {value: 530, duration: 2000, ease: 'Sine.easeInOut'},
                scaleX: {value: 0.79, duration: 2000, ease: 'Sine.easeInOut'},
                scaleY: {value: 0.79, duration: 2000, ease: 'Sine.easeInOut'},

            },
            onComplete: () => {
                this.enterRestartText()
                this.startCredits()
            }
        })
    }
    enterRestartText(){
        this.restartText = this.add.text(width / 2, -60, "Press SPACE to restart", this.restartTextConfig).setOrigin(0.5)
        this.restartText.setDepth(20)
        this.tweens.add({
            targets: this.restartText,
            y: 30
        })
    }

    startCredits(){
        this.creditsText = this.add.text(width / 2, 700, "Credits\n\nline 2\n\nline 3", this.restartTextConfig).setOrigin(0.5)
        this.tweens.add({
            targets: this.creditsText,
            y: - 700,
            duration: 10000
        })

    }

}