import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    private finalScore: number;
    constructor() {
        super({ key: "GameOverScene" });
    }

    init(data: { score: number }) {
        this.finalScore = data.score;
    }

    create() {
        const gameOverMessage = this.add.text(400, 300, "Game Over", {
            fontSize: "32px",
            color: "#fff",
            align: "center",
            backgroundColor: "#000",
        });
        gameOverMessage.setOrigin(0.5);

        const finalScoreText = this.add.text(
            400,
            350,
            `Final Score: ${this.finalScore}`,
            {
                fontSize: "32px",
                color: "#fff",
                align: "center",
                backgroundColor: "#000",
            }
        );
        finalScoreText.setOrigin(0.5);

        const restartText = this.add.text(400, 400, "Press R to restart", {
            fontSize: "32px",
            color: "#fff",
            align: "center",
            backgroundColor: "#000",
        });
        restartText.setOrigin(0.5);

        const rKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.R
        );
        rKey?.on("down", () => {
            this.scene.start("MainScene", { score: 0 });
        });
    }
}
