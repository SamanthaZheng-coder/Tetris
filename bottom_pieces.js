class BottomPieces {
    constructor(score) {
        this.score = score;
        this.pieces = [];
    }

    containsCoord(coord) {
            for (let pieceIndex = 0; pieceIndex < this.pieces.length; pieceIndex++) {
                let piece = this.pieces[pieceIndex]
                for (let coordIndex = 0; coordIndex < piece.coords.length; coordIndex++) {
                    if (piece.coords[coordIndex].equals(coord)) {
                        return true;
                    }
                }
            }
        return false;
    }

    addPiece(piece) {
        this.pieces.push(piece);
        this.checkRows();
    }


    checkRows() { // calls deleteRow

        var sortedByY = {};
        var yKeys = []

        //arrange the blocks by their y position
        for (let pieceIndex = 0; pieceIndex < this.pieces.length; pieceIndex++) {
            
            let piece = this.pieces[pieceIndex];
            
            for (let blockIndex = 0; blockIndex < piece.coords.length; blockIndex++) {
                
                let block = piece.coords[blockIndex];
                
                if (yKeys.indexOf(block.y) == -1) {
                    yKeys.push(block.y);
                    sortedByY[block.y] = [];
                }
                
                sortedByY[block.y].push(block);
            }
        }
		
        // delete the blocks calling deleteRow and get the number of lines deleted
        let blocksDeleted = 0;
        
        for (let i = 0; i < yKeys.length; i++) {
            
            let yKeyThisIteration = yKeys[i]
            
            if (sortedByY[yKeyThisIteration].length === STAGE_WIDTH) {
                
                blocksDeleted += this.deleteRow(yKeyThisIteration);
            }
        }
        
		// update the score
        let linesCleared = floor(blocksDeleted / (STAGE_WIDTH - 1));
        if (linesCleared) {
            this.score.addClearedLines(linesCleared);
        }
    }


    deleteRow(row) { // called by checkRows
        
        let blocksDeleted = 0;
        
        for (let pieceIndex = this.pieces.length - 1; pieceIndex > -1; pieceIndex--) {
            
            let piece = this.pieces[pieceIndex];
            
            for (let blockIndex = piece.coords.length - 1; blockIndex > -1; blockIndex--) {
                
                let block = this.pieces[pieceIndex].coords[blockIndex]
                
                if (block.y == row) {
                    
                    blocksDeleted += 1;
                    piece.coords.splice(blockIndex , 1);

                    if (piece.coords.length == 0) {
                        this.pieces.splice(pieceIndex, 1);
                    }
                    
                } else if (block.y < row) {
                    block.y += 1;
                }
            }
        }
        return blocksDeleted;
    }
}
