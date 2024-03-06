import Phaser from "phaser";

export default class Scene4 extends Phaser.Scene {
    private background?: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "Scene4" });
    }

    create() {
        this.background = this.add.image(400, 300, "mountain");

        const returnText = this.add
            .text(400, 500, "Return to game", {
                fontSize: "30px",
                color: "#fff",
                align: "center",
                backgroundColor: "#000",
            })
            .setOrigin(0.5);
        returnText.setInteractive();
        returnText.on("pointerdown", () => {
            this.scene.stop("Scene4");
        });
    }
}
