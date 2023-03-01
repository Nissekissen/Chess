class Bishop extends Piece {
    constructor(color, x, y) {
        super('b', color, x, y);
        if (color == 'd') this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg`
        else this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg`
    }
    getMoves(pieces) {
        let validMoves = []

        let xo = 0; // x offset
        let yo = 0; // y offset
        let stop = false;

        // -1;-1
        while (!stop && this.x - xo >= 0 && this.y - yo >= 0) {
            if (yo == 0) { xo++; yo++; continue; }

            if (this.canMoveHere(pieces, this.x-xo, this.y-yo)) validMoves.push({ x: this.x-xo, y: this.y-yo });

            if (this.canCaptureHere(pieces, this.x-xo, this.y-yo)) stop = true;
            if (pieces[this.y-yo][this.x-xo].color == this.color) stop = true;

            xo++;
            yo++;
        }
        stop = false;
        xo = 0;
        yo = 0;

        // -1;1
        while (!stop && this.x - xo >= 0 && this.y + yo <= 7) {
            if (yo == 0) { xo++; yo++; continue; }

            if (this.canMoveHere(pieces, this.x-xo, this.y+yo)) validMoves.push({ x: this.x-xo, y: this.y+yo });

            if (this.canCaptureHere(pieces, this.x-xo, this.y+yo)) stop = true;
            if (pieces[this.y+yo][this.x-xo].color == this.color) stop = true;

            xo++;
            yo++;
        }
        stop = false;
        xo = 0;
        yo = 0;

        // 1;-1
        while (!stop && this.x + xo <= 7 && this.y - yo >= 0) {
            if (yo == 0) { xo++; yo++; continue; }

            if (this.canMoveHere(pieces, this.x+xo, this.y-yo)) validMoves.push({ x: this.x+xo, y: this.y-yo });

            if (this.canCaptureHere(pieces, this.x+xo, this.y-yo)) stop = true;
            if (pieces[this.y-yo][this.x+xo].color == this.color) stop = true;

            xo++;
            yo++;
        }
        stop = false;
        xo = 0;
        yo = 0;

        // 1;1
        while (!stop && this.x + xo <= 7 && this.y + yo <= 7) {
            if (yo == 0) { xo++; yo++; continue; }

            if (this.canMoveHere(pieces, this.x+xo, this.y+yo)) validMoves.push({ x: this.x+xo, y: this.y+yo });

            if (this.canCaptureHere(pieces, this.x+xo, this.y+yo)) stop = true;
            if (pieces[this.y+yo][this.x+xo].color == this.color) stop = true;

            xo++;
            yo++;
        }

        return validMoves;
    }
}