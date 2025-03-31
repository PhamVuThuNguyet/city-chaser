import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import { GameConfig } from "../Config";

export class Game extends Scene {
    private starPi!: Phaser.GameObjects.Sprite;
    private pressCounter: number = 0;
    private pressCountText!: Phaser.GameObjects.Text;
    private timerText!: Phaser.GameObjects.Text;
    private timeRemaining: number = GameConfig.GAME_DURATION_SECONDS;
    private gameActive: boolean = false;
    private timer!: Phaser.Time.TimerEvent;
    private landmarks: typeof GameConfig.LANDMARKS = [];
    private lastPressTime: number = 0;
    private cooldownTime: number = GameConfig.KEY_PRESS_COOLDOWN_MS;
    private enterKeyIsDown: boolean = false;
    private gameContainer!: Phaser.GameObjects.Container;

    constructor() {
        super("Game");
    }

    preload() {
        this.load.setPath(GameConfig.ASSETS.BASE_PATH);

        // Load background image
        this.load.image("background", GameConfig.ASSETS.BACKGROUND);

        // Load character frames for animation
        this.load.image(
            `${GameConfig.ASSETS.CHARACTER.key}_1`,
            GameConfig.ASSETS.CHARACTER.frames.frame1
        );
        this.load.image(
            `${GameConfig.ASSETS.CHARACTER.key}_2`,
            GameConfig.ASSETS.CHARACTER.frames.frame2
        );
        this.load.image(
            `${GameConfig.ASSETS.CHARACTER.key}_jump`,
            "starpi-jump.png"
        );

        // Load landmark images
        this.load.image(
            GameConfig.ASSETS.LANDMARKS.ES4.key,
            GameConfig.ASSETS.LANDMARKS.ES4.path
        );
        this.load.image(
            GameConfig.ASSETS.LANDMARKS.DRAGON_BRIDGE.key,
            GameConfig.ASSETS.LANDMARKS.DRAGON_BRIDGE.path
        );
        this.load.image(
            GameConfig.ASSETS.LANDMARKS.MARBLE_MOUNTAINS.key,
            GameConfig.ASSETS.LANDMARKS.MARBLE_MOUNTAINS.path
        );
        this.load.image(
            GameConfig.ASSETS.LANDMARKS.LADY_BUDDHA.key,
            GameConfig.ASSETS.LANDMARKS.LADY_BUDDHA.path
        );
        this.load.image(
            GameConfig.ASSETS.LANDMARKS.HAN_RIVER_BRIDGE.key,
            GameConfig.ASSETS.LANDMARKS.HAN_RIVER_BRIDGE.path
        );
        this.load.image(
            GameConfig.ASSETS.LANDMARKS.BA_NA_HILLS.key,
            GameConfig.ASSETS.LANDMARKS.BA_NA_HILLS.path
        );

        // Load landmark check-in images
        GameConfig.LANDMARKS.forEach((landmark) => {
            this.load.image(
                landmark.image,
                GameConfig.ASSETS.getCheckInImagePath(landmark.image)
            );
        });
    }

    create() {
        // Setup landmarks with positions and thresholds
        this.landmarks = GameConfig.LANDMARKS;

        // Create a container for game elements that will shake
        this.gameContainer = this.add.container(0, 0);

        const backgroundImage = this.add
            .image(0, 0, "background")
            .setScale(1)
            .setOrigin(0, 0);
        backgroundImage.setDisplaySize(this.scale.width, this.scale.height);
        this.gameContainer.add(backgroundImage);

        // Create animation
        this.anims.create({
            key: GameConfig.ASSETS.CHARACTER.animation.key,
            frames: [
                { key: `${GameConfig.ASSETS.CHARACTER.key}_1` },
                { key: `${GameConfig.ASSETS.CHARACTER.key}_2` },
            ],
            frameRate: GameConfig.ASSETS.CHARACTER.animation.frameRate,
            repeat: GameConfig.ASSETS.CHARACTER.animation.repeat,
        });

        // Add title
        const title = this.add
            .text(
                GameConfig.LAYOUT.CENTER_X,
                GameConfig.LAYOUT.TITLE_Y,
                "Da Nang City Chase",
                GameConfig.TEXT_STYLES.TITLE
            )
            .setOrigin(0.5);
        this.gameContainer.add(title);

        // Instructions
        const instructions = this.add
            .text(
                GameConfig.LAYOUT.CENTER_X,
                GameConfig.LAYOUT.INSTRUCTIONS_Y,
                `Press ENTER as fast as you can for ${GameConfig.GAME_DURATION_SECONDS} seconds!\nHelp StarPi visit Da Nang landmarks!`,
                GameConfig.TEXT_STYLES.INSTRUCTIONS
            )
            .setOrigin(0.5);
        this.gameContainer.add(instructions);

        // Add landmarks
        this.landmarks.forEach((landmark) => {
            const landmarkKey = landmark.name
                .toLowerCase()
                .replace(/\s+/g, "-");
            const landmarkImage = this.add
                .image(landmark.position.x, landmark.position.y, landmarkKey)
                .setScale(GameConfig.SCALES.LANDMARKS)
                .setOrigin(0.5, 1);
            this.gameContainer.add(landmarkImage);
        });

        // Add StarPi at starting position (ES4) with animation playing
        this.starPi = this.add
            .sprite(
                this.landmarks[0].position.x +
                    GameConfig.LAYOUT.CHARACTER_X_OFFSET,
                this.landmarks[0].position.y -
                    GameConfig.LAYOUT.CHARACTER_Y_OFFSET,
                `${GameConfig.ASSETS.CHARACTER.key}_1`
            )
            .setScale(GameConfig.SCALES.CHARACTER);
        this.gameContainer.add(this.starPi);

        // Start walking animation immediately
        this.starPi.play(GameConfig.ASSETS.CHARACTER.animation.key);

        // Add press counter
        this.pressCountText = this.add
            .text(
                GameConfig.LAYOUT.CENTER_X,
                GameConfig.LAYOUT.COUNTER_Y,
                "Presses: 0",
                GameConfig.TEXT_STYLES.COUNTER
            )
            .setOrigin(0.5);
        this.gameContainer.add(this.pressCountText);

        // Add timer
        this.timerText = this.add
            .text(
                GameConfig.LAYOUT.CENTER_X,
                GameConfig.LAYOUT.TIMER_Y,
                `Time: ${GameConfig.GAME_DURATION_SECONDS}s`,
                GameConfig.TEXT_STYLES.COUNTER
            )
            .setOrigin(0.5);
        this.gameContainer.add(this.timerText);

        // Add start button
        const startButton = this.add
            .text(
                GameConfig.LAYOUT.CENTER_X,
                GameConfig.LAYOUT.START_BUTTON_Y,
                "START GAME",
                GameConfig.TEXT_STYLES.BUTTON
            )
            .setOrigin(0.5)
            .setInteractive();

        startButton.on("pointerdown", () => {
            this.startGame();
            startButton.setVisible(false);
        });

        // Register Enter key events
        if (this.input.keyboard) {
            this.input.keyboard.on("keydown-ENTER", this.handleKeyDown, this);
            this.input.keyboard.on("keyup-ENTER", this.handleKeyUp, this);
        }

        EventBus.emit("current-scene-ready", this);
    }

    handleKeyDown() {
        if (!this.gameActive || this.enterKeyIsDown) return;

        // Set key state to down
        this.enterKeyIsDown = true;

        // Get current time
        const currentTime = this.time.now;

        // Check if enough time has passed since last press
        if (currentTime - this.lastPressTime >= this.cooldownTime) {
            this.pressCounter++;
            this.pressCountText.setText(`Presses: ${this.pressCounter}`);

            // Update last press time
            this.lastPressTime = currentTime;

            // Add screen shake effect
            this.shakeScreen();
        }
    }

    handleKeyUp() {
        // Reset key state when released
        this.enterKeyIsDown = false;
    }

    // New method to create screen shake effect
    shakeScreen() {
        // Save the original position
        const originalX = 0;
        const originalY = 0;

        // Create a shake tween
        this.tweens.add({
            targets: this.gameContainer,
            x: {
                value: () =>
                    Phaser.Math.Between(
                        -GameConfig.ANIMATIONS.SHAKE.RANGE,
                        GameConfig.ANIMATIONS.SHAKE.RANGE
                    ),
            },
            y: {
                value: () =>
                    Phaser.Math.Between(
                        -GameConfig.ANIMATIONS.SHAKE.RANGE,
                        GameConfig.ANIMATIONS.SHAKE.RANGE
                    ),
            },
            duration: GameConfig.ANIMATIONS.SHAKE.DURATION,
            yoyo: true,
            repeat: GameConfig.ANIMATIONS.SHAKE.REPEAT,
            onComplete: () => {
                // Reset to original position
                this.gameContainer.x = originalX;
                this.gameContainer.y = originalY;
            },
        });
    }

    startGame() {
        this.gameActive = true;
        this.pressCounter = 0;
        this.timeRemaining = GameConfig.GAME_DURATION_SECONDS;
        this.pressCountText.setText(`Presses: ${this.pressCounter}`);
        this.lastPressTime = 0;
        this.enterKeyIsDown = false;

        // Make sure walking animation is playing
        if (!this.starPi.anims.isPlaying) {
            this.starPi.play(GameConfig.ASSETS.CHARACTER.animation.key);
        }

        // Create timer - making sure it's properly initialized
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeRemaining--;
                this.timerText.setText(`Time: ${this.timeRemaining}s`);

                if (this.timeRemaining <= 0) {
                    this.endGame();
                }
            },
            callbackScope: this,
            loop: true,
        });
    }

    endGame() {
        this.gameActive = false;

        try {
            // Handle any timer issues
            if (this.timer) {
                this.timer.remove();
            }
        } catch (error) {
            console.error("Error stopping timer:", error);
        }

        // Determine which landmark Pi reached based on press count
        let destinationIndex = 0;
        for (let i = this.landmarks.length - 1; i >= 0; i--) {
            if (this.pressCounter >= this.landmarks[i].threshold) {
                destinationIndex = i;
                break;
            }
        }

        // Stop walking animation and set jump texture
        this.starPi.anims.stop();
        this.starPi.setTexture(`${GameConfig.ASSETS.CHARACTER.key}_jump`);

        // Calculate jump arc parameters
        const startX = this.starPi.x;
        const startY = this.starPi.y;
        const endX = this.landmarks[destinationIndex].position.x;
        const endY = startY;

        // Create path points for the jump curve
        // We'll manually create a parabolic arc with multiple points
        const path = new Phaser.Curves.Path(startX, startY);

        // Calculate control points for a high parabolic arc
        const distance = Math.abs(endX - startX);
        const midX = (startX + endX) / 2;
        const jumpHeight = distance * 0.5; // Half the distance
        const controlY = startY - jumpHeight; // Control point high above to create arc

        // Add a quadratic curve to create the parabolic path
        path.quadraticBezierTo(endX, endY, midX, controlY);

        // Get total points along the path
        const points = path.getPoints(60); // 60 points along the path

        // Follow the path at consistent speed
        let currentPoint = 0;

        // Create a timer to follow the path
        const pathTimer = this.time.addEvent({
            delay: 25, // Faster updates for smoother motion
            callback: () => {
                // If we've reached the end of the path
                if (currentPoint >= points.length - 1) {
                    pathTimer.remove();

                    // Ensure character is exactly at the target position
                    this.starPi.x = endX;
                    this.starPi.y = endY;

                    // Switch back to standing frame at the end
                    this.starPi.setTexture(
                        `${GameConfig.ASSETS.CHARACTER.key}_1`
                    );

                    // Show the popup
                    this.showCheckInPopup(destinationIndex);
                    return;
                }

                // Move to the next point on the path
                this.starPi.x = points[currentPoint].x;
                this.starPi.y = points[currentPoint].y;

                // Increment to next point
                currentPoint++;
            },
            callbackScope: this,
            loop: true,
        });
    }

    showCheckInPopup(landmarkIndex: number) {
        const landmark = this.landmarks[landmarkIndex];

        // Hide StarPi
        this.starPi.setVisible(false);

        // Create a container for the popup elements at center of screen
        const popupContainer = this.add.container(
            GameConfig.LAYOUT.CENTER_X,
            GameConfig.LAYOUT.CENTER_Y
        );

        // Create panel background
        const panel = this.add.graphics();
        panel.fillStyle(
            GameConfig.ANIMATIONS.POPUP.FILL_COLOR,
            GameConfig.ANIMATIONS.POPUP.FILL_ALPHA
        );
        panel.fillRoundedRect(
            -GameConfig.LAYOUT.CENTER_X,
            -GameConfig.LAYOUT.CENTER_Y,
            1920,
            1080,
            0
        );

        // Add the graphics to the container
        popupContainer.add(panel);

        // Add check-in image
        const landmarkImage = this.add
            .image(0, -40, landmark.image)
            .setOrigin(0.5)
            .setScale(GameConfig.SCALES.CHECKIN_IMAGE);
        popupContainer.add(landmarkImage);

        // Add restart button
        const restartButton = this.add
            .text(
                0,
                GameConfig.LAYOUT.POPUP.RESTART_BUTTON_OFFSET,
                "PLAY AGAIN",
                {
                    ...GameConfig.TEXT_STYLES.PLAY_AGAIN,
                    fontSize: 32,
                    backgroundColor: "#ff3333",
                    padding: {
                        left: 30,
                        right: 30,
                        top: 15,
                        bottom: 15,
                    },
                }
            )
            .setOrigin(0.5)
            .setInteractive();
        popupContainer.add(restartButton);

        // Initial scale and alpha for the popup animation
        popupContainer.setScale(GameConfig.ANIMATIONS.POPUP.INITIAL_SCALE);
        popupContainer.setAlpha(0);

        // Create firework particles
        this.createFireworks();

        // Animate the popup appearing
        this.tweens.add({
            targets: popupContainer,
            scale: GameConfig.ANIMATIONS.POPUP.FINAL_SCALE,
            alpha: 1,
            duration: GameConfig.ANIMATIONS.POPUP.APPEAR_DURATION,
            ease: GameConfig.ANIMATIONS.POPUP.APPEAR_EASE,
        });

        restartButton.on("pointerdown", () => {
            // Animate the popup disappearing
            this.tweens.add({
                targets: popupContainer,
                scale: 0,
                alpha: 0,
                duration: GameConfig.ANIMATIONS.POPUP.DISAPPEAR_DURATION,
                onComplete: () => {
                    // Destroy the container and all its contents
                    popupContainer.destroy();

                    // Show StarPi again
                    this.starPi.setVisible(true);

                    // Reset StarPi to starting position
                    this.starPi.x =
                        this.landmarks[0].position.x +
                        GameConfig.LAYOUT.CHARACTER_X_OFFSET;
                    this.starPi.y =
                        this.landmarks[0].position.y -
                        GameConfig.LAYOUT.CHARACTER_Y_OFFSET;

                    // Restart walking animation
                    this.starPi.play(GameConfig.ASSETS.CHARACTER.animation.key);

                    // Reset presses count and timer
                    this.timeRemaining = GameConfig.GAME_DURATION_SECONDS;
                    this.pressCountText.setText(`Presses: 0`);

                    // Add start button again
                    const startButton = this.add
                        .text(
                            GameConfig.LAYOUT.CENTER_X,
                            GameConfig.LAYOUT.START_BUTTON_Y,
                            "START GAME",
                            GameConfig.TEXT_STYLES.BUTTON
                        )
                        .setOrigin(0.5)
                        .setInteractive();

                    startButton.on("pointerdown", () => {
                        this.startGame();
                        startButton.setVisible(false);
                    });
                },
            });
        });
    }

    createFireworks() {
        // Create fireworks with code-generated shapes
        const colors = GameConfig.ANIMATIONS.FIREWORKS.COLORS;
        let burstCount = 0;

        // Timer for firework bursts
        const fireworkTimer = this.time.addEvent({
            delay: GameConfig.ANIMATIONS.FIREWORKS.FREQUENCY,
            callback: () => {
                // Calculate random position for this burst around the popup
                const xVariation = Phaser.Math.Between(
                    -GameConfig.ANIMATIONS.POPUP.PANEL_WIDTH / 1.5,
                    GameConfig.ANIMATIONS.POPUP.PANEL_WIDTH / 1.5
                );
                const yVariation = Phaser.Math.Between(
                    -GameConfig.ANIMATIONS.POPUP.PANEL_HEIGHT / 1.5,
                    GameConfig.ANIMATIONS.POPUP.PANEL_HEIGHT / 1.5
                );

                // Make sure fireworks appear around (not inside) the popup
                let x = GameConfig.LAYOUT.CENTER_X + xVariation;
                let y = GameConfig.LAYOUT.CENTER_Y + yVariation;

                // Force position to be outside the panel
                const distance = Phaser.Math.Distance.Between(
                    GameConfig.LAYOUT.CENTER_X,
                    GameConfig.LAYOUT.CENTER_Y,
                    x,
                    y
                );

                const minDistance = Math.max(
                    GameConfig.ANIMATIONS.POPUP.PANEL_WIDTH / 2.5,
                    GameConfig.ANIMATIONS.POPUP.PANEL_HEIGHT / 2.5
                );

                if (distance < minDistance) {
                    // Scale the position to be outside
                    const angle = Math.atan2(
                        y - GameConfig.LAYOUT.CENTER_Y,
                        x - GameConfig.LAYOUT.CENTER_X
                    );
                    x =
                        GameConfig.LAYOUT.CENTER_X +
                        Math.cos(angle) * minDistance;
                    y =
                        GameConfig.LAYOUT.CENTER_Y +
                        Math.sin(angle) * minDistance;
                }

                // Create particle for this burst
                const colorIndex = burstCount % colors.length;
                this.createCodeFireworkBurst(x, y, colors[colorIndex]);

                burstCount++;

                // Stop after certain number of bursts
                if (burstCount >= GameConfig.ANIMATIONS.FIREWORKS.BURSTS) {
                    fireworkTimer.remove();
                }
            },
            callbackScope: this,
            loop: true,
        });
    }

    createCodeFireworkBurst(x: number, y: number, color: number) {
        // Number of particles
        const particleCount = GameConfig.ANIMATIONS.FIREWORKS.COUNT;

        // Container for all particles in this burst
        const burstContainer = this.add.container(x, y);

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            // Randomize each particle shape
            const shapeType = Phaser.Math.Between(0, 2);
            let particle: Phaser.GameObjects.GameObject;

            switch (shapeType) {
                // Circle
                case 0: {
                    particle = this.add.circle(
                        0,
                        0,
                        Phaser.Math.Between(3, 8),
                        color
                    );
                    break;
                }

                // Star
                case 1: {
                    particle = this.createStar(
                        0,
                        0,
                        Phaser.Math.Between(5, 12),
                        color
                    );
                    break;
                }

                // Line (case 2)
                default: {
                    const line = this.add.line(
                        0,
                        0,
                        0,
                        0,
                        0,
                        Phaser.Math.Between(5, 15),
                        color
                    );
                    line.setLineWidth(2);
                    particle = line;
                    break;
                }
            }

            // Add particle to container
            burstContainer.add(particle);

            // Calculate random direction for each particle
            const angle = Phaser.Math.DegToRad(Phaser.Math.Between(0, 360));
            const speed = Phaser.Math.Between(
                GameConfig.ANIMATIONS.FIREWORKS.SPEED.min,
                GameConfig.ANIMATIONS.FIREWORKS.SPEED.max
            );

            // Set velocity
            const velocityX = Math.cos(angle) * speed;
            const velocityY = Math.sin(angle) * speed;

            // Animate each particle
            this.tweens.add({
                targets: particle,
                x:
                    velocityX *
                    (GameConfig.ANIMATIONS.FIREWORKS.LIFESPAN / 1000),
                y:
                    velocityY *
                        (GameConfig.ANIMATIONS.FIREWORKS.LIFESPAN / 1000) +
                    (GameConfig.ANIMATIONS.FIREWORKS.GRAVITY *
                        Math.pow(
                            GameConfig.ANIMATIONS.FIREWORKS.LIFESPAN / 1000,
                            2
                        )) /
                        2,
                scaleX: {
                    from: GameConfig.ANIMATIONS.FIREWORKS.SCALE.start,
                    to: GameConfig.ANIMATIONS.FIREWORKS.SCALE.end,
                },
                scaleY: {
                    from: GameConfig.ANIMATIONS.FIREWORKS.SCALE.start,
                    to: GameConfig.ANIMATIONS.FIREWORKS.SCALE.end,
                },
                alpha: {
                    from: GameConfig.ANIMATIONS.FIREWORKS.ALPHA.start,
                    to: GameConfig.ANIMATIONS.FIREWORKS.ALPHA.end,
                },
                duration: GameConfig.ANIMATIONS.FIREWORKS.LIFESPAN,
                ease: "Sine.easeOut",
            });
        }

        // Destroy container after particles are done
        this.time.delayedCall(
            GameConfig.ANIMATIONS.FIREWORKS.LIFESPAN + 100,
            () => {
                burstContainer.destroy();
            }
        );
    }

    // Helper method to create a star shape
    createStar(x: number, y: number, radius: number, color: number) {
        const graphics = this.add.graphics();
        graphics.fillStyle(color, 1);

        const points = 5;
        const innerRadius = radius / 2;

        // Draw star path
        const path = [];
        for (let i = 0; i < points * 2; i++) {
            const r = i % 2 === 0 ? radius : innerRadius;
            const angle = Phaser.Math.DEG_TO_RAD * ((i * 180) / points);
            path.push({
                x: x + r * Math.cos(angle),
                y: y + r * Math.sin(angle),
            });
        }

        graphics.beginPath();
        graphics.moveTo(path[0].x, path[0].y);

        for (let i = 1; i < path.length; i++) {
            graphics.lineTo(path[i].x, path[i].y);
        }

        graphics.closePath();
        graphics.fillPath();

        return graphics;
    }
}

