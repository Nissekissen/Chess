class Move {
    constructor(from, to, piece, pieceCaptured) {
        this.from = { x: from.x, y: from.y };
        this.to = { x: to.x, y: to.y };
        this.piece = piece;
        this.pieceCaptured = pieceCaptured;
    }
}