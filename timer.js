class Timer {
    constructor(msPerTick, initialWait = 0) {
        this.msPerTick = msPerTick;
        this.ticking = true;
        this.lastTick = millis();
        this.initialWait = initialWait;
        this.whatInitialWaitWas = initialWait;
    }

    tick() {
        if (this.ticking) {
            if (this.initialWait) {
                this.lastTick -= this.initialWait;
                this.initialWait = 0;
            }
            var now = millis();
            if (now - this.lastTick >= this.msPerTick) {
                this.lastTick = now;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    setTickSize(ms) {
        this.msPerTick = ms;
    }

    restart() {
        this.lastTick = millis();
        this.initialWait = this.whatInitialWaitWas;
    }

    setTicking(ticking) {
        this.ticking = ticking;
    }
}
