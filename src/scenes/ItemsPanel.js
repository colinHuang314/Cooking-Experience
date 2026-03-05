class ItemsPanel extends Phaser.Scene {
    constructor() {
        super("itemsPanelScene")
    }

    preload() {

    }

    create() {
        this.items = []

        this.panel = this.add.rectangle(620, 270, 280, 330, 0xaaaaaa, 0.4).setOrigin(0, 0)

        this.draw()
    }

    update() {

    }

    addItem(item) {
        this.items.push(item)
        this.draw()
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item)
        this.draw()
    }

    draw() {
        this.items.forEach((item, index) => {
            const x = index % 2 === 0 ? 660 : 760
            const y = 305 + Math.floor(index / 2) * 85
            item.setPosition(x, y)
        })
    }
}
