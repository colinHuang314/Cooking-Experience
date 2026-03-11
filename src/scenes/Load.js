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
        itemsPanel = this.scene.get("itemsPanelScene")
        itemsPanel.cameras.main.setVisible(false)

        // audio
        this.load.audio('music', './assets/sound/music.mp3')

        // load sprites
        //scenes
        this.load.image('cabinet', './assets/images/cabinetScene.png')
        this.load.image('fridge', './assets/images/fridgeScene.png')
        this.load.image('stove', './assets/images/stoveScene.png')
        this.load.image('counter', './assets/images/counterScene.png')
        this.load.image('kitchen', './assets/images/kitchen.png')

        // items
        this.load.image('apple', './assets/images/apple.png')
        this.load.image('pot', './assets/images/pot.png')
        this.load.image('salt', './assets/images/salt.png')
        this.load.image('saltParticle', './assets/images/saltParticle.png')
        this.load.image('pepper', './assets/images/pepper.png') 
        this.load.image('chili', './assets/images/chili.png')
    }

    create() {
        this.scene.start('instructionsScene')
    }
}