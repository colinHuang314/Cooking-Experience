/*
Name: Colin Huang

Title: Cooking Experience

Time Tracked (total: incomplete):
    - took some structure from Endless Runner, added proof of concept for typing input and text animation (60 min) 2/15/26
    - experiment with different fonts, made class to handle typing combos (text and input), added nice animations to the text, experimented with more animations (150 min) 2/16/26

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
    scene: [ Load, Menu, Instructions, Cabinet, ItemsPanel ],// item panel on top
    fps: {
        target: 60,
        forceSetTimeOut: true
    }

}

let game = new Phaser.Game(config)

let width = game.config.width
let height = game.config.height

let fps = game.config.fps.target
