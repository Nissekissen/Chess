class Piece {
    constructor(type, color, x, y) {
        this.type = type;
        this.color = color;
        this.x = x;
        this.y = y;
        this.selected = false;
        this.highlighted = false;
        this.validMoves = [];
    }
    draw(ctx) {
        this.generateImage();
        // ctx.drawImage(this.image, this.x * 100, this.y * 100, 100, 100)
        // this.image.addEventListener('click', event => { console.log('clicked!') })

        if (this.selected) {
            ctx.fillStyle = 'yellow';
            ctx.globalAlpha = 0.2;
            ctx.fillRect(this.x * 100, this.y * 100, 100, 100);
            ctx.globalAlpha = 1.0;
        }
        

        this.image.onload = () => { ctx.drawImage(this.image, this.x * 100, this.y * 100, 100, 100); }
        this.image.onload();

        if (this.highlighted) {
            ctx.fillStyle = 'black';
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.arc(this.x * 100 + 50, this.y * 100 + 50, 45, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1.0;
        }
        
    }
    generateImage() {
        this.image = new Image;
        this.image.src = this.assetURL;
        this.image.width = 100;
        this.image.height = 100;
    }
    canMoveHere(pieces, x, y) {
        return pieces[y][x].type == 'e' || pieces[y][x].color != this.color
    }
    canCaptureHere(pieces, x, y) {
        return pieces[y][x].color != this.color && pieces[y][x].type != 'e';
    }
    getValidMoves(board) {
        // Ugly function, but makes the move, looks at all opponent moves, if any of those are captures of the king, it will not add that move to the list.
        const moves = this.getMoves(board.pieces);
        const validMoves = [];
        for (const move of moves) {
            let valid = true;
            let breaking = false;
            const testMove = board.move(this.x, this.y, move.x, move.y, true);
            // Loop through all opponent moves
            for (const rank of board.pieces) {
                for (const piece of rank) {
                    if (piece.type == 'e' || piece.color == this.color) continue;
                    // Loop through all possible moves for opponent
                    const opponentMoves = piece.getMoves(board.pieces);
                    for (const opponentMove of opponentMoves) {
                        const tempMove = board.move(piece.x, piece.y, opponentMove.x, opponentMove.y, true);
                        if (tempMove.pieceCaptured.type == 'k') { valid = false; breaking = true; }
                        board.undoMove(tempMove);

                        if (breaking) break;
                    }
                    if (breaking) break;
                }
                if (breaking) break;
            }
            board.undoMove(testMove);

            if (valid) validMoves.push(move)
        }


        this.validMoves = validMoves;

        return validMoves;
    }
    isValidMove(pieces, x, y) {
        if (!this.validMoves) this.getValidMoves();

        for (const move of this.validMoves) {
            if (move.x == x && move.y == y) return true;
        }
        return false;
    }
}