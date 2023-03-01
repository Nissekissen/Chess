class Knight extends Piece {
    constructor(color, x, y) {
        super('n', color, x, y);
        if (color == 'd') this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg`
        else this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg`
    }
    getMoves(pieces) {
        let validMoves = [];
        // -2;-1
        if (this.x > 1 && this.y > 0 && this.canMoveHere(pieces, this.x-2, this.y-1)) validMoves.push({x: this.x-2, y: this.y-1})
        // -1;-2
        if (this.x > 0 && this.y > 1 && this.canMoveHere(pieces, this.x-1, this.y-2)) validMoves.push({ x: this.x-1, y: this.y-2 })
        // 1;-2
        if (this.x < 7 && this.y > 1 && this.canMoveHere(pieces, this.x+1, this.y-2)) validMoves.push({ x: this.x+1, y: this.y-2 })
        // 2;-1
        if (this.x < 6 && this.y > 0 && this.canMoveHere(pieces, this.x+2, this.y-1)) validMoves.push({ x: this.x+2, y: this.y-1 })
        // 2;1
        if (this.x < 6 && this.y < 7 && this.canMoveHere(pieces, this.x+2, this.y+1)) validMoves.push({ x: this.x+2, y: this.y+1 })
        // 1;2
        if (this.x < 7 && this.y < 6 && this.canMoveHere(pieces, this.x+1, this.y+2)) validMoves.push({ x: this.x+1, y: this.y+2 })
        // -1;2
        if (this.x > 0 && this.y < 6 && this.canMoveHere(pieces, this.x-1, this.y+2)) validMoves.push({ x: this.x-1, y: this.y+2 })
        // -2;1
        if (this.x > 1 && this.y < 7 && this.canMoveHere(pieces, this.x-2, this.y+1)) validMoves.push({ x: this.x-2, y: this.y+1 })

        return validMoves
    }
}