class DrawGame {

    constructor(game) {
        this.game = game;
    }

    drawGame() {
        fill(BACKGROUND_COLOR);
        rect(0, 0, width, height);
        this.drawText();
        this.drawBorders();
        this.drawPieces();
    }

    coordInPx(coord) {
        return coord.copy().mult(BLOCK_SIZE);
    }

    renderText(theText, thePosition, theColor) {
        rectMode(CENTER);
        fill(theColor);
        stroke(theColor);
        textSize(TEXT_SIZE)
        thePosition = this.coordInPx(thePosition);
        text(theText, thePosition.x, thePosition.y);
    }

    drawText() {
        textAlign(CENTER);
        this.renderText("LINES", createVector(BOARD_CENTER_X, 2), TITLES_COLOR);
        this.renderText(str(this.game.score.lines), createVector(BOARD_CENTER_X, 2.7), TEXT_COLOR);
        
        this.renderText("LEVEL", createVector(BOARD_CENTER_X, 5), TITLES_COLOR);
        this.renderText(str(this.game.score.level), createVector(BOARD_CENTER_X, 5.7), TEXT_COLOR);
        
        this.renderText("SCORE", createVector(BOARD_CENTER_X, 8), TITLES_COLOR);
        this.renderText(str(this.game.score.score), createVector(BOARD_CENTER_X, 8.7), TEXT_COLOR);
        
        this.renderText("NEXT PIECE", createVector(BOARD_CENTER_X, 12), TITLES_COLOR);
        
        if (this.game.paused) {
            this.renderText("PAUSE", createVector(BOARD_CENTER_X, 10.2), PAUSE_TEXT_COLOR);
        }
        else if (this.game.gameOver) {
            this.renderText("GAME OVER", createVector(BOARD_CENTER_X, 10.2), GAME_OVER_TEXT_COLOR);
        }
    }

    drawPiece(piece) {
        fill(piece.color)
        for (var blockPos = 0; blockPos < piece.coords.length; blockPos++) {
            var pixelPos = this.coordInPx(piece.coords[blockPos]);
            rect(pixelPos.x, pixelPos.y, BLOCK_SIZE, BLOCK_SIZE);
        }
    }

    drawPieces() {
        rectMode(CORNER);
        stroke(PIECE_STROKE_COLOR);
        this.drawPiece(this.game.player);
        this.drawPiece(this.game.nextPiece);
        for (var pieceIndex = 0; pieceIndex < this.game.bottomPieces.pieces.length; pieceIndex++) {
            this.drawPiece(this.game.bottomPieces.pieces[pieceIndex]);
        }
    }

    drawBorders() {
        rectMode(CORNERS);
        noFill();
        stroke(BORDER_COLOR);
        var stageRect = [this.coordInPx(STAGE_TOP_LEFT), this.coordInPx(STAGE_BOTTOM_RIGHT)];
        rect(stageRect[0].x, stageRect[0].y, stageRect[1].x, stageRect[1].y);

        var rightAreaTopLeft = createVector(BOARD_MARGIN.x - 1, BOARD_MARGIN.y);
        var rightAreaBottomRight = createVector(BOARD_MARGIN.x + BOARD_WIDTH, STAGE_HEIGHT + 1);
        var rightAreaRect = [this.coordInPx(rightAreaTopLeft), this.coordInPx(rightAreaBottomRight)];
        rect(rightAreaRect[0].x, rightAreaRect[0].y, rightAreaRect[1].x, rightAreaRect[1].y);
    }

}
