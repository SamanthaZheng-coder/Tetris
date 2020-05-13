var STAGE_MARGIN, BOARD_MARGIN, BOARD_CENTER_X;
var PIECE_STAGE_STARTING_POSITION, NEXT_PIECE_POSITION;
var SCREEN_SIZE, SCREEN_SIZE_PX, STAGE_TOP_LEFT, STAGE_BOTTOM_RIGHT;

function setup() {
    
    STAGE_MARGIN = createVector(1, 1);
    BOARD_MARGIN = createVector(STAGE_WIDTH + 3, STAGE_MARGIN.y);
    BOARD_CENTER_X = int(BOARD_MARGIN.x + BOARD_WIDTH / 2);
    PIECE_STAGE_STARTING_POSITION = createVector(4, 0);
    NEXT_PIECE_POSITION = createVector(BOARD_CENTER_X - 2, 13);
    SCREEN_SIZE = createVector(BOARD_MARGIN.x + BOARD_WIDTH + 1,
                               STAGE_HEIGHT + 2);
    SCREEN_SIZE_PX = SCREEN_SIZE.copy().mult(BLOCK_SIZE);
    STAGE_TOP_LEFT = STAGE_MARGIN;
    STAGE_BOTTOM_RIGHT = createVector(STAGE_MARGIN.x + STAGE_WIDTH,
                                      STAGE_MARGIN.y + STAGE_HEIGHT);
    
    createCanvas(SCREEN_SIZE_PX.x, SCREEN_SIZE_PX.y);
    game = new Game();
}

function draw() {
    game.run();
}


function keyPressed() {
    if (game.playing) {
        var moved = false
        if (keyCode == UP_ARROW) {
            game.rotatePlayer();
        } else if (keyCode == DOWN_ARROW) {
            moved = true;
            game.movePlayer(createVector(0, 1));
        } else if (keyCode == RIGHT_ARROW) {
            moved = true;
            game.movePlayer(createVector(1, 0));
        } else if (keyCode == LEFT_ARROW) {
            moved = true;
            game.movePlayer(createVector(-1, 0));
        } else if (keyCode == 32) { // spacebar
            if (keyIsDown(RIGHT_ARROW)) {
                game.movePieceToLimit(createVector(1, 0));
            } else if (keyIsDown(LEFT_ARROW)) {
                game.movePieceToLimit(createVector(-1, 0));
            } else {
                game.movePieceToLimit(createVector(0, 1));
            }
        }
        if (moved) {
            game.keyPressedTimer.setTicking(true);
            game.setKeyPressed(keyCode);
        }
    }
}

function keyReleased() {
    game.setKeyUnpressed();
}
