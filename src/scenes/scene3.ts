import Phaser from "phaser";

export default class Scene3 extends Phaser.Scene {
    private background?: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "Scene3" });
    }

    create() {
        this.background = this.add.image(400, 300, "winter");
        const nextSceneText = this.add
            .text(400, 500, "Next Scene", {
                fontSize: "30px",
                color: "#fff",
                align: "center",
                backgroundColor: "#000",
            })
            .setOrigin(0.5);
        nextSceneText.setInteractive();
        nextSceneText.on("pointerdown", () => {
            this.scene.stop("Scene3");
            this.scene.launch("Scene4");
        });
    }
}
