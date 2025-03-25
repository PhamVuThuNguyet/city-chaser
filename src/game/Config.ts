export const GameConfig = {
    // Game timing settings
    GAME_DURATION_SECONDS: 60,
    KEY_PRESS_COOLDOWN_MS: 200,

    // Visual settings
    COOLDOWN_COLOR_READY: 0x00ff00, // Green
    COOLDOWN_COLOR_WAIT: 0xff0000, // Red
    SCALES: {
        CHARACTER: 0.05,
        LANDMARKS: 0.5,
        CHECKIN_IMAGE: 0.4,
    },

    // Layout settings for 1920x1080 resolution
    LAYOUT: {
        CENTER_X: 960,
        CENTER_Y: 540,
        TITLE_Y: 120,
        INSTRUCTIONS_Y: 220,
        COUNTER_Y: 320,
        TIMER_Y: 400,
        START_BUTTON_Y: 600,
        LANDMARKS_Y: 900,
        CHARACTER_Y_OFFSET: 100, // How far above landmarks the character appears
        SCREEN_PADDING: 10, // Minimum padding from screen edges
    },

    // Animation settings
    ANIMATIONS: {
        SHAKE: {
            RANGE: 5, // Pixels to shake in each direction
            DURATION: 50, // Duration of each shake (ms)
            REPEAT: 2, // Number of shake repeats
        },
        POPUP: {
            PANEL_WIDTH: 700, // Width of popup panel
            PANEL_HEIGHT: 500, // Height of popup panel
            CORNER_RADIUS: 20, // Corner radius of popup panel
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
            STROKE_COLOR: 0x9999ff, // Stroke color for popup panel
            FILL_ALPHA: 0.9, // Fill alpha for popup panel
            LINE_WIDTH: 5, // Line width for popup panel
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
        TEXT_POSITIONS: {
            TITLE_OFFSET: 140, // Y offset for popup title from center
            PRESS_COUNT_OFFSET: 70, // Y offset for press count text from center
            GIFT_TEXT_OFFSET: 70, // Y offset for gift text from center
            RESTART_BUTTON_OFFSET: 170, // Y offset for restart button from center
        },
    },

    // Landmark settings
    LANDMARKS: [
        {
            name: "ES4 Building",
            position: { x: 200, y: 900 },
            threshold: 0,
            image: "starpi-es4",
            gift: "ES4 Notebook!",
        },
        {
            name: "Dragon Bridge",
            position: { x: 520, y: 900 },
            threshold: 10,
            image: "starpi-dragon",
            gift: "Dragon Bridge Miniature!",
        },
        {
            name: "Marble Mountains",
            position: { x: 840, y: 900 },
            threshold: 15,
            image: "starpi-marble",
            gift: "Marble Mountains Postcard!",
        },
        {
            name: "Lady Buddha",
            position: { x: 1160, y: 900 },
            threshold: 20,
            image: "starpi-lady",
            gift: "Lady Buddha Keychain!",
        },
        {
            name: "Han River Bridge",
            position: { x: 1480, y: 900 },
            threshold: 25,
            image: "starpi-han",
            gift: "Han River Bridge Model!",
        },
        {
            name: "Ba Na Hills",
            position: { x: 1800, y: 900 },
            threshold: 30,
            image: "starpi-bana",
            gift: "Ba Na Hills Golden Ticket!",
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
        GIFT: {
            fontFamily: "Arial Black",
            fontSize: 30,
            color: "#ffff00",
            stroke: "#000000",
            strokeThickness: 4,
            align: "center",
            wordWrap: { width: 500 },
        },
        CONGRATS_TEXT: {
            fontFamily: "Arial Black",
            fontSize: 30,
            color: "#ffff00",
            stroke: "#ffffff",
            strokeThickness: 3,
            align: "center",
            wordWrap: { width: 500 },
        },
        POPUP_TITLE: {
            fontFamily: "Arial Black",
            fontSize: 28,
            color: "#000000",
            stroke: "#ffffff",
            strokeThickness: 1,
            align: "center",
            wordWrap: { width: 500 },
        },
        POPUP_TEXT: {
            fontFamily: "Arial",
            fontSize: 28,
            color: "#ffffff",
            align: "center",
            wordWrap: { width: 500 },
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
                key: "es4",
                path: "es4.png",
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
        POPUP_BG: {
            key: "popup-bg",
            path: "popup-bg.png",
        },
        // Helper function for landmark check-in images
        getCheckInImagePath: (imageKey: string) => `${imageKey}.png`,
    },
};

