export const GameConfig = {
    // Game timing settings
    GAME_DURATION_SECONDS: 15,
    KEY_PRESS_COOLDOWN_MS: 120,

    // Visual settings
    SCALES: {
        CHARACTER: 0.05,
        LANDMARKS: 0.9,
        CHECKIN_IMAGE: 0.7,
        BUTTONS: 0.5,
    },

    // Layout settings for 1920x1080 resolution
    LAYOUT: {
        CENTER_X: 960,
        CENTER_Y: 540,
        COUNTER_X: 800,
        COUNTER_Y: 320,
        TIMER_X: 1100,
        TIMER_Y: 320,
        START_BUTTON_Y: 430,
        CHARACTER_X_OFFSET: 120,
        CHARACTER_Y_OFFSET: 50, // How far above landmarks the character appears
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
            FILL_COLOR: 0x333366, // Fill color for popup panel
            FILL_ALPHA: 0.5, // Fill alpha for popup panel
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
            position: { x: 200, y: 815 },
            threshold: 0,
            image: "lose",
        },
        {
            name: "Lady Buddha",
            position: { x: 520, y: 810 },
            threshold: 60,
            image: "win-1",
        },
        {
            name: "Han River Bridge",
            position: { x: 840, y: 810 },
            threshold: 80,
            image: "win-2",
        },
        {
            name: "Marble Mountains",
            position: { x: 1160, y: 810 },
            threshold: 85,
            image: "win-3",
        },
        {
            name: "Ba Na Hills",
            position: { x: 1480, y: 810 },
            threshold: 90,
            image: "win-4",
        },
        {
            name: "Dragon Bridge",
            position: { x: 1800, y: 810 },
            threshold: 95,
            image: "win-5",
        },
    ],

    // Text settings
    TEXT_STYLES: {
        COUNTER: {
            fontFamily: "Inter",
            fontSize: 36,
            color: "#1040FF",
        },
    },

    // Asset keys and paths
    ASSETS: {
        BASE_PATH: "assets/citychase",
        BACKGROUND: "background.png",
        BUTTON: { START: "start.png", PLAY_AGAIN: "play-again.png" },
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

