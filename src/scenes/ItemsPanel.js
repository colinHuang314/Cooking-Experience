class ItemsPanel extends Phaser.Scene {
    constructor() {
        super("itemsPanelScene")
    }

    preload() {

    }

    create() {
        this.items = []

        this.panel = this.add.rectangle(620, 200, 280, 400, 0xaaaaaa, 0.8).setOrigin(0, 0)

        this.draw()
    }

    update() {

    }

    addItem(item, name) {
        this.items.push({ item, name })
        this.draw()
    }

    removeItem(item) {
        this.items = this.items.filter(i => i.item !== item) // https://www.w3schools.com/jsref/jsref_filter.asp
        this.draw()
    }

    draw() {
        this.items.forEach((item, index) => {
            const x = index % 2 === 0 ? 660 : 760
            const y = 235 + Math.floor(index / 2) * 80
            item.item.setPosition(x, y)
        })
    }
}
