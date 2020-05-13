class Game {

    constructor() {
        this.playing = true;
        this.paused = false;
        this.gameOver = false;
        this.player = new Piece();
        this.nextPiece = new Piece();
        this.player.setPosition(PIECE_STAGE_STARTING_POSITION);
        this.score = new Score();
        this.bottomPieces = new BottomPieces(this.score);
        this.draw = new DrawGame(this);

        this.lowerPieceTimer = new Timer(500);
        this.keyPressedTimer = new Timer(200, 500);
        this.keyPressedTimer.setTicking(false);
        this.keyPressed = undefined;
    }

    setKeyPressed(theKey) {
        this.keyPressed = theKey;
    }

    setKeyUnpressed() {
        this.keyPressed = false;
    }

    run() {
        if (this.keyPressedTimer.tick() && this.playing) {
            if (this.keyPressed == DOWN_ARROW) {
                this.movePlayer(createVector(0, 1));
                this.lowerPieceTimer.restart();
            } else if (this.keyPressed == LEFT_ARROW) {
                this.movePlayer(createVector(-1, 0));
            } else if (this.keyPressed == RIGHT_ARROW) {
                this.movePlayer(createVector(1, 0));
            }
        }
        if (this.lowerPieceTimer.tick() && this.playing) {
            this.movePlayer(createVector(0, 1));
        }
        this.draw.drawGame();
    }

    pause() {
        this.paused = !this.paused;
    }


    playerOverstepsBottomPieces() {
        for (let i = 0; i < this.player.coords.length; i++) {
            let coord = this.player.coords[i];
            if (this.bottomPieces.containsCoord(coord)) {
                return true;
            }
        }
        return false;
    }

    playerOverstepsBorder() {
        for (let i = 0; i < this.player.coords.length; i++) {
        	let coord = this.player.coords[i];
            let insideXLimits = STAGE_MARGIN.x <= coord.x &&
                coord.x <= STAGE_WIDTH + STAGE_MARGIN.x - 1;
            let insideYLimits = coord.y <= STAGE_HEIGHT + STAGE_MARGIN.y - 1;
            if (!insideXLimits || !insideYLimits) {
                return true;
            }
        }
        return false
    }

    playerOversteps() {
        return this.playerOverstepsBorder() || this.playerOverstepsBottomPieces();
    }

    movePlayer(coord) {
        this.player.move(coord)
        if (this.playerOversteps()) {
            this.player.move(coord.copy().mult(-1));
            if (coord.y) {
                this.changePlayer();
            }
        }
    }
    
    changePlayer() {
        this.bottomPieces.addPiece(this.player);
        this.player = this.nextPiece;
        this.nextPiece = new Piece();
        this.player.setPosition(PIECE_STAGE_STARTING_POSITION);
        this.player.offsetPiece();
        this.lowerPieceTimer.restart();
        this.keyPressedTimer.restart();
        if (this.playerOverstepsBottomPieces()) {
            this.movePlayer(createVector([0, -1]))
            this.playerLost();
        }
    }

    rotatePlayer() {
        this.player.rotateCw();
        if (this.playerOversteps()) {
            this.player.rotateCcw();
        }
    }

    playerLost() {
        this.gameOver = true;
        this.playing = false;
    }

    movePieceToLimit(coord) {
        //It lowers the piece to the bottom in one movement,
        //or it moves it to the right or left until a limit is met
        function hasAdvanced(previousPos, currentPos) {
            if (coord.x > 0) {
                return previousPos.x < currentPos.x;
            } else if (coord.x < 0) {
                return previousPos.x > currentPos.x;
            } else if (coord.y > 0) {
                return previousPos.y < currentPos.y;
            } else if (coord.y < 0) {
                return previousPos.y > currentPos.y;
            } else if (previousPos == currentPos) {
                return false;
            }
        }

        var keepMoving = true;
        while (keepMoving) {
            var oldPosition = this.player.position.copy()
            this.movePlayer(coord);
            if (!hasAdvanced(oldPosition, this.player.position)) {
                keepMoving = false;
            }
        }
    }
}
