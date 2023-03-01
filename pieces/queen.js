class Queen extends Piece {
    constructor(color, x, y) {
        super('q', color, x, y);
        if (color == 'd') this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg`
        else this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg`
    }
    getMoves(pieces) {
        // Just takes the data from the bishop and from the rook and joins it together.
        const tempRook = new Rook(this.color, this.x, this.y);
        const tempBishop = new Bishop(this.color, this.x, this.y);

        const validMoves = tempRook.getMoves(pieces).concat(tempBishop.getMoves(pieces));

        return validMoves;
    }
}