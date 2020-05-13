class Score {
    constructor() {
        this.lines = 0;
        this.level = 0;
        this.score = 0;
    }

    addClearedLines(lines) {
        this.lines += lines
        this.level = floor(this.lines / 10)
        if (lines == 1) this.score += 40 * (this.level + 1);
        else if (lines == 2) this.score += 100 * (this.level + 1);
        else if (lines == 3) this.score += 300 * (this.level + 1);
        else if (lines == 4) this.score += 1200 * (this.level + 1);
    }
}
