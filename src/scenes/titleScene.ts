import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: "TitleScene" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#000");

        this.add.text(225, 300, "Press SPACE to Start", {
            fontSize: "32px",
            color: "#fff",
        });

        const spaceKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        spaceKey?.on("down", () => {
            this.scene.start("MainScene");
        });
    }
}
