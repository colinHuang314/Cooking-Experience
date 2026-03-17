class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        // get panel ready
        this.scene.launch('itemsPanelScene')
        this.scene.launch('endingScene')
        

        // audio
        this.load.audio('music', './assets/sound/music.mp3')
        this.load.audio('threeShake', './assets/sound/threeShake.wav')
        this.load.audio('bigSplash', './assets/sound/bigSplash.wav')
        this.load.audio('chopChop', './assets/sound/chopChop.wav')
        this.load.audio('mealComplete', './assets/sound/mealComplete.wav')
        this.load.audio('oneNoteC', './assets/sound/oneNoteC.wav')
        this.load.audio('sceneChange', './assets/sound/sceneChange.wav')
        this.load.audio('smallSplash', './assets/sound/smallSplash.wav')
        this.load.audio('spacePress', './assets/sound/spacePress.wav')
        this.load.audio('toInventory', './assets/sound/toInventory.wav')
        this.load.audio('wind', './assets/sound/wind.wav')
        this.load.audio('wordComplete', './assets/sound/wordComplete.wav')

        //scenes
        this.load.image('cabinet', './assets/images/cabinetScene.png')
        this.load.image('fridge', './assets/images/fridgeScene.png')
        this.load.image('stove', './assets/images/stoveScene.png')
        this.load.image('counter', './assets/images/counterScene.png')
        this.load.image('kitchen', './assets/images/kitchen.png')

        // items
        this.load.image('pot', './assets/images/pot.png')
        this.load.image('salt', './assets/images/salt.png')
        this.load.image('saltParticle', './assets/images/saltParticle.png')
        this.load.image('pepper', './assets/images/pepper.png') 
        this.load.image('chili', './assets/images/chili.png')
        this.load.image('carrot', './assets/images/carrot.png')
        this.load.image('chicken', './assets/images/chicken.png')
        this.load.image('garlic', './assets/images/garlic.png')
        this.load.image('groundBeef', './assets/images/groundBeef.png')
        this.load.image('noodles', './assets/images/noodles.png')
        this.load.image('carrotSliced', './assets/images/carrotSliced.png')
        this.load.image('garlicSliced', './assets/images/garlicSliced.png')
        this.load.image('tomatoSliced', './assets/images/tomatoSliced.png')
        this.load.image('soySauce', './assets/images/soySauce.png')
        this.load.image('tomato', './assets/images/tomato.png')
        this.load.image('knife', './assets/images/knife.png')
        this.load.image('carrotParticle', './assets/images/carrotParticle.png')
        this.load.image('garlicParticle', './assets/images/garlicParticle.png')
        this.load.image('tomatoParticle', './assets/images/tomatoParticle.png')
        this.load.image('starParticle', './assets/images/starParticle.png')
        
        this.load.image('letterFront', './assets/images/letterFront.png')
        this.load.image('menuSS', './assets/images/menuSS.png')
        this.load.image('heart', './assets/images/heart.png')
        this.load.image('potFront', './assets/images/potFront.png')
    }

    create() {
        itemsPanel = this.scene.get("itemsPanelScene")
        endingScene = this.scene.get("endingScene")
        

        this.scene.switch('instructionsScene')
    }
}