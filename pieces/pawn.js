class Pawn extends Piece {
    constructor(color, x, y) {
        super('p', color, x, y);
        if (color == 'd') this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg`
        else this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg`

        this.enPassantPossible = false;
    }
    getMoves(pieces) {
        let validMoves = []

        if (this.color == 'l') {
            // 0;-2
            if (this.y == 6 && pieces[this.y-1][this.x].type == 'e' && pieces[this.y-2][this.x].type == 'e') validMoves.push({ x: this.x, y: this.y-2 });
            // 0;-1
            if (pieces[this.y-1][this.x].type == 'e') validMoves.push({ x: this.x, y: this.y-1 })

            // -1;-1 (without en passant)
            if (this.x > 0 && this.canCaptureHere(pieces, this.x-1, this.y-1)) validMoves.push({ x: this.x-1, y: this.y-1 })
            // 1;-1 (without en passant)
            if (this.x < 7 && this.canCaptureHere(pieces, this.x+1, this.y-1)) validMoves.push({ x: this.x+1, y: this.y-1 })

            // En passant
        } else {
            // 0;2
            if (this.y == 1 && pieces[this.y+1][this.x].type == 'e' && pieces[this.y+2][this.x].type == 'e') validMoves.push({ x: this.x, y: this.y+2 });
            // 0;1
            if (pieces[this.y+1][this.x].type == 'e') validMoves.push({ x: this.x, y: this.y+1 })

            // -1;1 (without en passant)
            if (this.x > 0 && this.canCaptureHere(pieces, this.x-1, this.y+1)) validMoves.push({ x: this.x-1, y: this.y+1 })
            // 1;1 (without en passant)
            if (this.x < 7 && this.canCaptureHere(pieces, this.x+1, this.y+1)) validMoves.push({ x: this.x+1, y: this.y+1 })
        }

        return validMoves;
    }
}