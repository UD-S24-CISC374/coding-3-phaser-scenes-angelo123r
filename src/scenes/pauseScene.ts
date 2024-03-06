import Phaser from "phaser";

export default class PauseScene extends Phaser.Scene {
    private score: number;

    init(data: { score: number }) {
        this.score = data.score;
    }

    constructor() {
        super({ key: "PauseScene" });
    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5);

        const title = this.add.text(400, 250, "Settings", {
            fontSize: "32px",
            color: "#fff",
            align: "center",
        });
        title.setOrigin(0.5);

        const resume = this.add
            .text(400, 500, "Back", {
                fontSize: "24px",
                color: "#fff",
                align: "center",
            })
            .setOrigin(0.5);
        resume.setInteractive();
        resume.on("pointerdown", () => {
            this.scene.stop("PauseScene");
            this.scene.resume("MainScene");
        });

        const escKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );
        escKey?.on("down", () => {
            this.scene.stop("PauseScene");
            this.scene.resume("MainScene");
        });

        const backgroundToggle = this.add
            .text(400, 400, "Change Scene", {
                fontSize: "30px",
                color: "#fff",
                align: "center",
            })
            .setOrigin(0.5);
        backgroundToggle.setInteractive();
        backgroundToggle.on("pointerdown", () => {
            this.scene.launch("Scene2", { score: this.score });
        });
    }
}
