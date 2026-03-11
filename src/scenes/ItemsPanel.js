class ItemsPanel extends Phaser.Scene {
    constructor() {
        super("itemsPanelScene")
    }

    preload() {

    }

    create() {
        this.items = []

        this.panel = this.add.rectangle(620, 0, 280, 600, 0xaaaaaa, 0.8).setOrigin(0, 0)

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

    getPosition(index){
        const x = index % 2 === 0 ? 660 : 760
        const y = 35 + Math.floor(index / 2) * 100
        return [x, y]
    }

    draw() {
        this.items.forEach((item, index) => {
            let [x, y] = this.getPosition(index)
            item.item.setPosition(x, y)
        })
    }
}

/*
At counter:
only garlic, carrot, tomato can be cut

At pot:
cant put garlic carrot tomato in without cutting

once you put one sliced food, one meat(or noodle), one seasoning you can now "stir" and "wait"

once you stir and wait once each you have option to "done" -> goes to conclusion


*/
