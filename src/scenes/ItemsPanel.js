class ItemsPanel extends Phaser.Scene {
    constructor() {
        super("itemsPanelScene")
    }

    preload() {

    }

    create() {
        this.cuttable = ["tomato", "garlic", "carrot"]
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

    removeItem(name) {
        for (const entry of this.items) {
            if (entry.name === name) {
                this.tweens.add({
                    targets: entry.item,
                    alpha: 0,
                    duration: 500,
                    onComplete: () => {
                        entry.item.destroy()
                    }
                })
                const idx = this.items.indexOf(entry)
                if (idx !== -1) {
                    this.items.splice(idx, 1)
                }
                break
            }
        }
        this.time.delayedCall(1000, () => {
            this.draw()
        })
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

    // https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
    getItem(name){
        return this.items.find(i => i.name === name)
    }

    getCuttableItems() {
        let result = [];
        for (const i of this.items) {
            if (this.cuttable.includes(i.name)) {
                result.push(i)
            }
        }
        return result
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
