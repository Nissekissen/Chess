class King extends Piece {
    constructor(color, x, y) {
        super('k', color, x, y);
        if (color == 'd') this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg`
        else this.assetURL = `https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg`
    }
    getMoves(pieces, side) {
        let validMoves = [];
        // -1;0
        if (this.x > 0 && this.canMoveHere(pieces, this.x-1, this.y)) validMoves.push({x: this.x-1, y: this.y})
        // -1;-1
        if (this.x > 0 && this.y > 0 && this.canMoveHere(pieces, this.x-1, this.y-1)) validMoves.push({ x: this.x-1, y: this.y-1 })
        // 0;-1
        if (this.y > 0 && this.canMoveHere(pieces, this.x, this.y-1)) validMoves.push({ x: this.x, y: this.y-1 })
        // 1;-1
        if (this.x < 7 && this.y > 0 && this.canMoveHere(pieces, this.x+1, this.y-1)) validMoves.push({ x: this.x+1, y: this.y-1 })
        // 1;0
        if (this.x < 7 && this.canMoveHere(pieces, this.x+1, this.y)) validMoves.push({ x: this.x+1, y: this.y })
        // 1;1
        if (this.x < 7 && this.y < 7 && this.canMoveHere(pieces, this.x+1, this.y+1)) validMoves.push({ x: this.x+1, y: this.y+1 })
        // 0;1
        if (this.y < 7 && this.canMoveHere(pieces, this.x, this.y+1)) validMoves.push({ x: this.x, y: this.y+1 })
        // -1;1
        if (this.x > 0 && this.y < 7 && this.canMoveHere(pieces, this.x-1, this.y+1)) validMoves.push({ x: this.x-1, y: this.y+1 })

        return validMoves
    }
    
}