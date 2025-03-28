export const GameConfig = {
    // Game timing settings
    GAME_DURATION_SECONDS: 10,
    KEY_PRESS_COOLDOWN_MS: 200,

    // Visual settings
    SCALES: {
        CHARACTER: 0.05,
        LANDMARKS: 0.9,
        CHECKIN_IMAGE: 0.7,
    },

    // Layout settings for 1920x1080 resolution
    LAYOUT: {
        CENTER_X: 960,
        CENTER_Y: 540,
        TITLE_Y: 80,
        INSTRUCTIONS_Y: 170,
        COUNTER_Y: 250,
        TIMER_Y: 320,
        START_BUTTON_Y: 430,
        LANDMARKS_Y: 900,
        CHARACTER_X_OFFSET: 120,
        CHARACTER_Y_OFFSET: 50, // How far above landmarks the character appears
        SCREEN_PADDING: 10, // Minimum padding from screen edges
        POPUP: {
            RESTART_BUTTON_OFFSET: 350, // Y offset for restart button from center},
        },
    },

    // Animation settings
    ANIMATIONS: {
        SHAKE: {
            RANGE: 5, // Pixels to shake in each direction
            DURATION: 50, // Duration of each shake (ms)
            REPEAT: 2, // Number of shake repeats
        },
        POPUP: {
            PANEL_WIDTH: 900, // Width of popup panel
            PANEL_HEIGHT: 800, // Height of popup panel
            APPEAR_DURATION: 800, // Duration of popup appearance animation (ms)
            APPEAR_EASE: "Back.Out", // Easing for popup appearance
            EMPHASIS_DELAY: 1000, // Delay before emphasis animation (ms)
            EMPHASIS_DURATION: 100, // Duration of each emphasis movement (ms)
            EMPHASIS_DISTANCE: 10, // Distance to move during emphasis
            EMPHASIS_REPEAT: 3, // Number of emphasis repeats
            DISAPPEAR_DURATION: 300, // Duration for popup disappearance (ms)
            INITIAL_SCALE: 0.1, // Initial scale for popup
            FINAL_SCALE: 1, // Final scale for popup
        },
        FIREWORKS: {
            COUNT: 30,
            LIFESPAN: 1500,
            SPEED: {
                min: 40,
                max: 200,
            },
            SCALE: {
                start: 1,
                end: 0.2,
            },
            ALPHA: {
                start: 1,
                end: 0,
            },
            COLORS: [
                0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff,
            ],
            FREQUENCY: 500,
            BURSTS: 10,
            GRAVITY: 200,
            ORIGIN_VARIATION: 100,
        },
    },

    // Landmark settings
    LANDMARKS: [
        {
            name: "ES4 Building",
            position: { x: 200, y: 830 },
            threshold: 0,
            image: "lose",
        },
        {
            name: "Dragon Bridge",
            position: { x: 520, y: 810 },
            threshold: 10,
            image: "win-1",
        },
        {
            name: "Marble Mountains",
            position: { x: 840, y: 810 },
            threshold: 15,
            image: "win-2",
        },
        {
            name: "Lady Buddha",
            position: { x: 1160, y: 810 },
            threshold: 20,
            image: "win-3",
        },
        {
            name: "Han River Bridge",
            position: { x: 1480, y: 810 },
            threshold: 25,
            image: "win-4",
        },
        {
            name: "Ba Na Hills",
            position: { x: 1800, y: 810 },
            threshold: 30,
            image: "win-5",
        },
    ],

    // Text settings
    TEXT_STYLES: {
        TITLE: {
            fontFamily: "Arial Black",
            fontSize: 64,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
        },
        INSTRUCTIONS: {
            fontFamily: "Arial",
            fontSize: 32,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 4,
            align: "center",
        },
        LANDMARK_LABEL: {
            fontFamily: "Arial",
            fontSize: 20,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 4,
            align: "center",
        },
        COUNTER: {
            fontFamily: "Arial",
            fontSize: 42,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6,
            align: "center",
        },
        BUTTON: {
            fontFamily: "Arial Black",
            fontSize: 42,
            color: "#ffffff",
            backgroundColor: "#008800",
            padding: {
                left: 30,
                right: 30,
                top: 15,
                bottom: 15,
            },
        },

        PLAY_AGAIN: {
            fontFamily: "Arial Black",
            fontSize: 28,
            color: "#ffffff",
            backgroundColor: "#ff5555",
            padding: {
                left: 25,
                right: 25,
                top: 12,
                bottom: 12,
            },
        },
    },

    // Asset keys and paths
    ASSETS: {
        BASE_PATH: "assets/citychase",
        BACKGROUND: "background.jpg",
        CHARACTER: {
            key: "starpi",
            path: "starpi-1.png",
            frames: {
                frame1: "starpi-1.png",
                frame2: "starpi-2.png",
            },
            animation: {
                key: "walk",
                frameRate: 8,
                repeat: -1,
            },
        },
        LANDMARKS: {
            ES4: {
                key: "es4-building",
                path: "es4-building.png",
            },
            DRAGON_BRIDGE: {
                key: "dragon-bridge",
                path: "dragon-bridge.png",
            },
            MARBLE_MOUNTAINS: {
                key: "marble-mountains",
                path: "marble-mountains.png",
            },
            LADY_BUDDHA: {
                key: "lady-buddha",
                path: "lady-buddha.png",
            },
            HAN_RIVER_BRIDGE: {
                key: "han-river-bridge",
                path: "han-river-bridge.png",
            },
            BA_NA_HILLS: {
                key: "ba-na-hills",
                path: "ba-na-hills.png",
            },
        },

        // Helper function for landmark check-in images
        getCheckInImagePath: (imageKey: string) => `${imageKey}.png`,
    },
};

