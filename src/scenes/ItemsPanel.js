class ItemsPanel extends Phaser.Scene {
    constructor() {
        super("itemsPanelScene")
    }

    preload() {
    }

    create() {
        this.cameras.main.setVisible(false)
        this.allItemNames = ["tomato", "garlic", "carrot", "chicken", "groundBeef", "noodles", "chili", "pepper", "salt", "soySauce", "carrotSliced", "garlicSliced", "tomatoSliced"]
        this.skipItemNames = ["chicken", "groundBeef", "noodles", "chili", "pepper", "salt", "soySauce", "carrotSliced", "garlicSliced", "tomatoSliced"]
        this.skipItemText = ["Chicken", "Ground Beef", "Noodles", "Chili Flakes", "Pepper", "Salt", "Soy Sauce", "Sliced Carrot", "Sliced Garlic", "Sliced Tomato"]
        this.cuttable = ["tomato", "garlic", "carrot"]
        this.main = ["chicken", "groundBeef", "noodles"]
        this.vegetable = ["tomato", "garlic", "carrot", "carrotSliced", "garlicSliced", "tomatoSliced"]
        this.seasoning = ["chili", "pepper", "salt", "soySauce"]

        this.items = []

        this.panel = this.add.rectangle(620, 0, 280, 600, 0xaaaaaa, 0.8).setOrigin(0, 0)

        this.draw()
    }

    update() {

    }

    addItem(item, name, text) {
        this.items.push({ item, name, text })
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

    // one main, one vegetable, one seasoning
    hasAllIngredients(potList = []){
        let hasMain = false
        let hasVeg = false
        let hasSeasoning = false
        for(const item of this.items){
            if(this.main.includes(item.name)){
                hasMain = true
            }
            if(this.vegetable.includes(item.name)){
                hasVeg = true
            }
            if(this.seasoning.includes(item.name)){
                hasSeasoning = true
            }
        }
        for(const item of potList){
            if(this.main.includes(item.name)){
                hasMain = true
            }
            if(this.vegetable.includes(item.name)){
                hasVeg = true
            }
            if(this.seasoning.includes(item.name)){
                hasSeasoning = true
            }
        }

        return (hasMain && hasVeg && hasSeasoning)
    }

    

}

