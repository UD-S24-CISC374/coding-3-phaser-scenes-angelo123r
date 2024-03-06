import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("star", "assets/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.image("forest", "assets/forest.png");
        this.load.image("desert", "assets/desert.png");
        this.load.image("winter", "assets/winter.png");
        this.load.image("mountain", "assets/mountain.png");
        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.scene.start("TitleScene");
        this.add.image(400, 300, "sky");
        this.add.image(400, 300, "star");
    }

    update() {}
}
