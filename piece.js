class Piece {
    constructor(name = undefined) {
        this.position = NEXT_PIECE_POSITION.copy();
        let randomName = Object.keys(PIECES_DATA)[round(random(6))];
        name = (name ? name : randomName)
        this.shape = JSON.parse(JSON.stringify(PIECES_DATA[name].shape));
        this.color = JSON.parse(JSON.stringify(PIECES_DATA[name].color));
        this.coords = undefined;
        this.updateCoords();
        if (PIECES_DATA[name].hasOwnProperty("offset")) {
            this.offset = PIECES_DATA[name].offset;
            this.offsetPiece();
        }
    }

    updateCoords() {
        var r = []
        for (let rowIndex = 0; rowIndex < this.shape.length; rowIndex++) {
            for (let colIndex = 0; colIndex < this.shape[rowIndex].length; colIndex++) {
                if (this.shape[rowIndex][colIndex]) {
                    let x = rowIndex + this.position.x + STAGE_MARGIN.x;
                    let y = colIndex + this.position.y + STAGE_MARGIN.y;
                    r.push(createVector(x, y));
                }
            }
        }
        this.coords = r;
    }


    offsetPiece() {
        if (this.hasOwnProperty("offset")) {
            this.move(createVector(this.offset, 0));
        }
    }

    rotateCcw(updateCoords = true) {
        let r = [];
        while (this.shape) {
            if (this.shape[0].length != 0) {
                r.push([]);
                for (var i = 0; i <= this.shape.length - 1; i++) {
                    r[r.length - 1].push(this.shape[i].pop());
                }
            } else {
                this.shape = false;
            }
        }
        this.shape = r;
        if (updateCoords) {
            this.updateCoords();
        }
    }

    rotateCw() {
        // booleans define if coordinates get updated
        this.rotateCcw(false);
        this.rotateCcw(false);
        this.rotateCcw(true);
    }


    move(coord) {
        this.position.add(coord)
        for (let i = 0; i < this.coords.length; i++) {
            this.coords[i].add(coord);
        }
        this.updateCoords();
    }

    setPosition(coord) {
        this.position = coord.copy();
        this.updateCoords();
        this.offsetPiece();
    }

    moveRight() {
        this.move(createVector(1, 0));
    }

    moveLeft() {
        this.move(createVector(-1, 0));
    }

    moveDown() {
        this.move(createVector(0, 1));
    }

}
