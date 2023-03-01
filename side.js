class SideData {
    constructor(color, king, rookRight, rookLeft) {
        this.color = color;
        this.king = king;
        this.rookLeft = rookLeft;
        this.rookRight = rookRight;
        this.rookLeftMoved = false;
        this.rookRightMoved = false;
        this.kingHasMoved = false;
    }
    rookMoved(pieces, x, y) {
        const piece = pieces[y][x];
        if (piece == this.rookLeft) this.rookLeftMoved = true;
        else if (piece == this.rookRight) this.rookRightMoved = true;
    }
    kingMoved(pieces, x, y) {
        const piece = pieces[y][x];
        if (piece == this.king) this.kingHasMoved = true;
    }
}