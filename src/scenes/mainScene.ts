import Phaser from "phaser";
export type Collidable =
    | Phaser.Types.Physics.Arcade.GameObjectWithBody
    | Phaser.Tilemaps.Tile;
export default class MainScene extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.Group;

    private background?: Phaser.GameObjects.Image;
    private score = 0;
    private scoreText?: Phaser.GameObjects.Text;
    private bombs?: Phaser.Physics.Arcade.Group;
    private gameOver = false;
    private gameOverScene?: Phaser.Scene;
    private finalScore: number = 0;

    constructor() {
        super({ key: "MainScene" });
    }

    init(data: { score: number }) {
        this.score = data.score || 0;
    }

    create() {
        this.background = this.add.image(400, 300, "sky");

        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            400,
            568,
            "ground"
        ) as Phaser.Physics.Arcade.Sprite;

        ground.setScale(2).refreshBody();

        this.platforms.create(600, 400, "ground");
        this.platforms.create(50, 250, "ground");
        this.platforms.create(750, 220, "ground");

        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.stars.children.iterate((c) => {
            const child = c as Phaser.Physics.Arcade.Image;
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(
            this.player,
            this.stars,
            this.handleCollectStar,
            undefined,
            this
        );

        this.scoreText = this.add.text(16, 16, "score: 0", {
            fontSize: "32px",
            color: "#000",
            backgroundColor: "#fff",
        });

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(
            this.player,
            this.bombs,
            this.handleHitBomb,
            undefined,
            this
        );

        this.events.on("changeBackground", (textureKey: string) => {
            this.background?.setTexture(textureKey);
        });

        const pauseText = this.add.text(
            this.sys.canvas.width - 16,
            16,
            "Press ESC to pause",
            {
                fontSize: "16px",
                color: "#fff",
                backgroundColor: "#000",
                padding: { x: 10, y: 5 },
            }
        );
        pauseText.setOrigin(1, 0);
    }

    private handleHitBomb() {
        this.physics.pause();
        this.player?.setTint(0xff0000);
        this.player?.anims.play("turn");
        this.gameOver = true;
    }
    private handleCollectStar(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ) {
        const star = s as Phaser.Physics.Arcade.Image;
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText?.setText("Score: " + this.score);

        if (this.stars?.countActive(true) === 0) {
            this.stars.children.iterate((c) => {
                const child = c as Phaser.Physics.Arcade.Image;
                child.enableBody(true, child.x, 0, true, true);
                return true;
            });

            if (this.player) {
                const x =
                    this.player.x < 400
                        ? Phaser.Math.Between(400, 800)
                        : Phaser.Math.Between(0, 400);

                for (let i = 0; i < 5; i++) {
                    const bomb: Phaser.Physics.Arcade.Image =
                        this.bombs?.create(x, 16, "bomb");

                    bomb.setBounce(1);
                    bomb.setCollideWorldBounds(true);
                    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                }
            }
        }

        this.scene.get("GameOverScene").events.on("shutdown", () => {
            this.gameOver = false;
        });

        if (this.score >= 120) {
            this.scene.launch("BackgroundChangeScene", { score: this.score });
        }
    }

    update() {
        const escKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        );

        if (!this.cursors) {
            return;
        }

        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        } else if (this.cursors.right.isDown) {
            this.player?.setVelocityX(160);

            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);

            this.player?.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocityY(-330);
        }

        if (escKey?.isDown) {
            this.scene.pause("MainScene");
            this.scene.launch("PauseScene", { score: this.score });
        }

        if (this.gameOver) {
            this.scene.launch("GameOverScene", { score: this.score });
            this.scene.pause("MainScene");
        }
    }
}
