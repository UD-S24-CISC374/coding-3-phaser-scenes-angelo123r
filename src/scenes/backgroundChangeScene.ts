import Phaser from "phaser";

export default class BackgroundChangeScene extends Phaser.Scene {
    private playerScore: number;

    constructor() {
        super({ key: "BackgroundChangeScene" });
    }

    init(data: { score: number }) {
        this.playerScore = data.score;
    }

    create() {
        if (this.playerScore >= 120) {
            this.scene
                .get("MainScene")
                .events.emit("changeBackground", "forest");
        }
    }
}
