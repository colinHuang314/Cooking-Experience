/*
Name: Colin Huang

Title: Cooking Experience

Time Spent: 25 hrs

Notes: Type "skip" during the intro of the game to skip it, type "skip" in the menu to get all items and go to the stove scene

Citations:
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
https://www.w3schools.com/jsref/jsref_filter.asp
https://phaser.io/examples/v3.85.0/tweens/view/multiple-delayed-properties
https://phaser.io/examples/v3.85.0/tweens/view/multiple-targets-multiple-properties
Prof. Altice
*/


config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    render: {
        antialias: true,
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ Load, Instructions, Menu, Fridge, Cabinet, Stove, Counter, ItemsPanel],
    fps: {
        target: 60,
        forceSetTimeOut: true
    }

}

let game = new Phaser.Game(config)

let width = game.config.width
let height = game.config.height

let fps = game.config.fps.target

let defaultTextConfig = {
    fontFamily: 'Monospace',
    fontSize: '45px',
    color: '#146aff',
    align: 'center',
    fontStyle: 'bold',
    stroke: '#c1e0ff',
    strokeThickness: 2,
    shadow: {
        offsetX: 0,
        offsetY: 4,
        color: '#146aff',
        blur: 25,
        stroke: true,
        fill: true
    },
    padding: {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30,
    },
}
let defaultTextHighlightedConfig = {
    fontFamily: 'Monospace',
    fontSize: '50px',
    color: '#9514ff',
    align: 'center',
    fontStyle: 'bold',
    stroke: '#ffffff',
    strokeThickness: 5,
    shadow: {
        offsetX: 0,
        offsetY: 4,
        color: '#9d14ff',
        blur: 25,
        stroke: false,
        fill: true
    },
    padding: {
        left: 30,
        right: 30,
        top: 30,
        bottom: 30,
    },
}

// scenes
let itemsPanel = null
let fridgeScene = null
let cabinetScene = null
let stoveScene = null
let counterScene = null
let menuScene = null


// wordcombo text configs
let itemTextConfig = { 
    ...defaultTextConfig, color: '#048e3b', fontSize: '30px',
    shadow: { ...defaultTextHighlightedConfig.shadow, color: '#048e3b' } 
}
let itemTextHighlightedConfig = { 
    ...defaultTextHighlightedConfig, color: '#00e135', fontSize: '34px',
    shadow: { ...defaultTextHighlightedConfig.shadow, color: '#00c64f' } 
}
let menuTextConfig = { 
    ...defaultTextConfig, fontSize: '28px',
} 
let menuTextHighlightedConfig = { 
    ...defaultTextHighlightedConfig, fontSize: '32px',
}
