/*
Name: Colin Huang

Title: Cooking At Manzanita

Time Spent: 28 hrs

Notes:  Type "skip" during the intro of the game to skip the intro
        Type "skip" in the menu to get all items and go to the stove scene
        Type "skip" in the stove scene to skip to the ending

        For the 5 components I did:
            - text objects
            - tweens
            - particle effects
            - keyboard input
            - somewhat timers and cameras (delayedCall() and fadeIn())

        Polish/Style: I made nice animations to make the game feel smooth and made the logic for the floating text. Also a unique and fun concept.

Citations:
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
https://www.w3schools.com/jsref/jsref_filter.asp
https://phaser.io/examples/v3.85.0/tweens/view/multiple-delayed-properties
https://phaser.io/examples/v3.85.0/tweens/view/multiple-targets-multiple-properties
https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
Prof. Altice



TODO
conclusion(flip?)(animations, other effects?)
replay without reloading

credits(what i made and what i used)

add more messages

stove logic and conclusion logic
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
    ...defaultTextConfig, color: '#cfcf18', fontSize: '28px', stroke: '#2d2d05', strokeThickness: 3,
    shadow: { ...defaultTextHighlightedConfig.shadow, color: '#cfcf18' } 
}
let itemTextHighlightedConfig = { 
    ...defaultTextHighlightedConfig, color: '#fff200', fontSize: '32px', stroke: '#000000',
    shadow: { ...defaultTextHighlightedConfig.shadow, color: '#fff200' } 
}
let menuTextConfig = { 
    ...defaultTextConfig, fontSize: '28px',
} 
let menuTextHighlightedConfig = { 
    ...defaultTextHighlightedConfig, fontSize: '32px',
}
let specialTextConfig = { 
    ...defaultTextConfig, color: '#cf18c3', fontSize: '28px', stroke: '#450641', strokeThickness: 3,
    shadow: { ...defaultTextHighlightedConfig.shadow, color: '#cf18c3' } 
} 
let specialTextHighlightedConfig = { 
    ...defaultTextHighlightedConfig, color: '#ff00ee', fontSize: '32px', stroke: '#000000',
    shadow: { ...defaultTextHighlightedConfig.shadow, color: '#ff00ee' } 
}
