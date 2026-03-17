
class Ending extends Phaser.Scene {
    constructor() {
        super("endingScene")
    }

    preload() {
    }

    create() {
        this.canRestart = false
        
        this.restartTextConfig = {
            fontFamily: 'Helvetica',
            fontSize: '40px',
            color: '#ffa3c5',
            // stroke: '#ffffff',
            // strokeThickness: 6,
            align: 'center',
            wordWrap: { width: game.config.width - 100 }
        }

        this.messageConfig = {
            fontFamily: 'Helvetica',
            fontSize: '70px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            align: 'center',
            wordWrap: { width: game.config.width - 100 }
        }
        this.creditsConfig = {
            fontFamily: 'Sans',
            fontSize: '30px',
            color: '#ff8f20',
            align: 'center',
            wordWrap: { width: game.config.width - 100 }
        }

        this.cameras.main.setVisible(false)
    }

    update() {

    }

    startAnimation(){
        this.pot = this.add.image(313, 355, 'pot').setOrigin(0.5)

        this.time.delayedCall(2000, () => {
            this.centerPot()
        })
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
                this.startMessages()
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
            emitting: false 
        })
        this.potFront.setDepth(20)
        heartEmmiter.explode(20)
        this.time.delayedCall(3500, () => {
            // heartEmmiter.stop()

            this.time.delayedCall(2000, () => {
                this.movePotDown()
            })
            
        })
    }

    startMessages(){
        const message1 = this.add.text(width / 2, 500, "Nice job!", this.messageConfig).setOrigin(0.5).setAlpha(0)
        this.tweens.add({
            targets: message1,
            alpha: 1,
            duration: 800,
            hold: 1000,
            yoyo: true,
            onComplete: () => {
                const message2 = this.add.text(width / 2, 500, "Thanks for playing!", this.messageConfig).setOrigin(0.5).setAlpha(0)
                this.tweens.add({
                    targets: message2,
                    alpha: 1,
                    duration: 800,
                    hold: 1000,
                    yoyo: true,
                })
            }
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
                this.box2 = this.add.rectangle(120, 535, 245, 150, 0x000000).setDepth(5)
                this.box3 = this.add.rectangle(680, 535, 245, 150, 0x000000).setDepth(5)

                this.enterRestartText()
                this.startCredits()
                this.startFoodAnimations()
            }
        })
    }
    enterRestartText(){
        this.box = this.add.rectangle(400, 0, 600, 150, 0x000000)
        this.box.setDepth(10)

        this.restartText = this.add.text(width / 2, -60, "Press SPACE to restart", this.restartTextConfig).setOrigin(0.5)
        this.restartText.setDepth(20)
        this.tweens.add({
            targets: this.restartText,
            y: 30,
            onComplete: () => {
                this.canRestart = true
                this.input.keyboard.on('keydown-SPACE', (event) => {
                    if(this.canRestart){
                        this.resetGame()
                    }
                })
            }
        })
    }

    startCredits(){
        this.creditsText = this.add.text(width / 2, 710, "--- CREDITS ---\n\nMusic: Me, made in Bandlab\n\nSound Effects: Me, recorded live\n\nVisuals: Me, pixel art\n\nAll other assets: Me", this.creditsConfig).setOrigin(0.5)
        this.tweens.add({
            targets: this.creditsText,
            y: 220,
            duration: 10000
        })

    }

    startFoodAnimations(){
        const items = itemsPanel.allItemNames

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                const randomKey = Phaser.Utils.Array.GetRandom(items)

                let spawnX, spawnY
                    
                const side = Phaser.Math.Between(0, 1)

                if (side === 0) {// left
                    spawnX = -50
                    spawnY = Phaser.Math.Between(50, this.pot.y - 150)
                } else { // right
                    spawnX = 850
                    spawnY = Phaser.Math.Between(50, this.pot.y - 150)
                }
                
                const item = this.add.image(spawnX, spawnY, randomKey).setScale(1.2).setDepth(15)

                this.tweens.add({
                    targets: item,
                    props: {
                        x: {value: this.pot.x, duration: 1400, ease: 'linear'},
                        y: {value: this.pot.y, duration: 1400, ease: 'Back.easeIn'},
                        alpha: {value: 0.2, duration: 1400, ease: 'Circ.easeIn'},
                        scale: {value: 1.6, duration: 1400, ease: 'linear'}
                    },
                    onComplete: () => {
                        item.destroy()
                    }
                })
            },
            callbackScope: this,
            loop: true
        })


    }

    resetGame(){
        if(music){
            music.stop()
        }

        itemsPanel = null
        endingScene = null
        music = null

        this.scene.manager.getScenes(false).forEach(sc => {
            sc.scene.stop()
        })

        this.scene.start('loadScene')
    }

}