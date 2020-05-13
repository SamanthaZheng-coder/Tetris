const STAGE_WIDTH = 9; // 'stage' is where the pieces move.
const STAGE_HEIGHT = 17;
const BLOCK_SIZE = 30;
const BOARD_WIDTH = 5; // the board shows the next piece, the score and lines
const BORDER_COLOR = [160, 160, 160];
const BORDER_WIDTH = 1; // the borders surrounding areas
const BACKGROUND_COLOR = [0, 0, 0];
const TITLES_COLOR = [0, 85, 180];
const TEXT_COLOR = [255, 255, 255];
const TEXT_SIZE = Math.round(BLOCK_SIZE / 2);
const GAME_OVER_TEXT_COLOR = [255, 0, 0];
const PAUSE_TEXT_COLOR = [255, 255, 255];
const PIECE_STROKE_COLOR = [200, 200, 200];


const PIECES_DATA = {
    "L": {
        "color": [128, 94, 0],
        "offset": -1, // used to center the piece when it appears on screen
        "shape": [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ]
    },

    "J": {
        "color": [0, 0, 128],
        "shape": [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    },

    "I": {
        "color": [0, 128, 128],
        "offset": -1,
        "shape": [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0]
        ]
    },

    "S": {
        "color": [0, 128, 0],
        "offset": -1,
        "shape": [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    },

    "Z": {
        "color": [128, 0, 0],
        "shape": [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ]
    },

    "T": {
        "color": [128, 0, 128],
        "shape": [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    },

    "O": {
        "color": [128, 128, 0],
        "shape": [
            [1, 1],
            [1, 1]
        ]
    }
};
