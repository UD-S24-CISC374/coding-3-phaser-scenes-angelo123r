import Phaser from "phaser";

export default class Scene2 extends Phaser.Scene {
    private background?: Phaser.GameObjects.Image;
    private score: number;

    constructor() {
        super({ key: "Scene2" });
    }

    init(data: { score: number }) {
        this.score = data.score;
    }

    create() {
        this.background = this.add.image(400, 300, "desert");

        const currentScoreText = this.add.text(
            400,
            350,
            `Current Score: ${this.score}`,
            {
                fontSize: "32px",
                color: "#fff",
                align: "center",
                backgroundColor: "#000",
            }
        );
        currentScoreText.setOrigin(0.5);

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
            this.scene.stop("Scene2");
            this.scene.launch("Scene3");
        });
    }
}
