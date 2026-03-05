class Animations{
    constructor(scene){
        this.scene = scene
    }
    pickupAnimation(item, x, y, callback){
        //https://phaser.io/examples/v3.85.0/tweens/view/multiple-targets-multiple-properties
        this.scene.tweens.add({
            targets: item,
            props: {
                x: {value: x, duration: 1000, ease: 'linear'},
                y: {value: y, duration: 1000, ease: 'Back.easeIn'},
                scaleX: {value: 1.5, duration: 1000, ease: 'Power2'},
                scaleY: {value: 1.5, duration: 1000, ease: 'Power2'},
                alpha: {value: 0, duration: 1000, ease: 'linear'},
            },
            onComplete: () => {
                item.destroy()
                if(callback) {
                    callback()
                }
            }
        })
    }

    messageAnimation(messageText, time, callback){
        this.scene.tweens.add({
            targets: messageText,
            y: 550,
            duration: 1200,
            ease: 'Power2.easeOut',
            onComplete: () => {
                this.scene.tweens.add({
                    targets: messageText,
                    alpha: 0,
                    duration: 1200,
                    delay: time,
                    ease: 'Linear',
                    onComplete: () => {
                        if(callback) {
                            callback()
                        }
                    }
                })
            }
        })
    }
}