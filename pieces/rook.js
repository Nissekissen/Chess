class Rook extends Piece {
    constructor(color, x, y) {
        super('r', color, x, y);
        if (color == 'd') this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg`
        else this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg`
    }
    getMoves(pieces) {
        let validMoves = []

        let xo = 0; // x offset
        let yo = 0; // y offset
        let stop = false;

        // 0;-1
        while (!stop && this.y - yo >= 0) {
            if (yo == 0) { yo++; continue; }

            if (this.canMoveHere(pieces, this.x, this.y-yo)) validMoves.push({ x: this.x, y: this.y-yo });

            if (this.canCaptureHere(pieces, this.x, this.y-yo)) stop = true;
            if (pieces[this.y-yo][this.x].color == this.color) stop = true;

            yo++;
        }
        stop = false;
        xo = 0;
        yo = 0;

        // 0;1
        while (!stop && this.y + yo <= 7) {
            if (yo == 0) { yo++; continue; }

            if (this.canMoveHere(pieces, this.x, this.y+yo)) validMoves.push({ x: this.x, y: this.y+yo });

            if (this.canCaptureHere(pieces, this.x, this.y+yo)) stop = true;
            if (pieces[this.y+yo][this.x].color == this.color) stop = true;

            yo++;
        }
        stop = false;
        xo = 0;
        yo = 0;

        // -1;0
        while (!stop && this.x - xo >= 0) {
            if (xo == 0) { xo++; continue; }

            if (this.canMoveHere(pieces, this.x-xo, this.y)) validMoves.push({ x: this.x-xo, y: this.y });

            if (this.canCaptureHere(pieces, this.x-xo, this.y)) stop = true;
            if (pieces[this.y][this.x-xo].color == this.color) stop = true;

            xo++;
        }
        stop = false;
        xo = 0;
        yo = 0;

        // 0;1
        while (!stop && this.x + xo <= 7) {
            if (xo == 0) { xo++; continue; }

            if (this.canMoveHere(pieces, this.x+xo, this.y)) validMoves.push({ x: this.x+xo, y: this.y });

            if (this.canCaptureHere(pieces, this.x+xo, this.y)) stop = true;
            if (pieces[this.y][this.x+xo].color == this.color) stop = true;

            xo++;
        }

        return validMoves;
    }
}