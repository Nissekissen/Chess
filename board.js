class Board {
    constructor(ctx) {
        this.ctx = ctx;

        this.pieces = [];
        this.pieces.push([new Rook('d', 0, 0), new Knight('d', 1, 0), new Bishop('d', 2, 0), new Queen('d', 3, 0), new King('d', 4, 0), new Bishop('d', 5, 0), new Knight('d', 6, 0), new Rook('d', 7, 0)])
        this.pieces.push([new Pawn('d', 0, 1), new Pawn('d', 1, 1), new Pawn('d', 2, 1), new Pawn('d', 3, 1), new Pawn('d', 4, 1), new Pawn('d', 5, 1), new Pawn('d', 6, 1), new Pawn('d', 7, 1)])
        for (let i = 0; i < 4; i++) {
            this.pieces.push([]);
            for (let j = 0; j < 8; j++) {
                this.pieces[this.pieces.length-1].push(new Empty(j, i+2))
            }
        }
        this.pieces.push([new Pawn('l', 0, 7-1), new Pawn('l', 1, 7-1), new Pawn('l', 2, 7-1), new Pawn('l', 3, 7-1), new Pawn('l', 4, 7-1), new Pawn('l', 5, 7-1), new Pawn('l', 6, 7-1), new Pawn('l', 7, 7-1)])
        this.pieces.push([new Rook('l', 0, 7-0), new Knight('l', 1, 7-0), new Bishop('l', 2, 7-0), new Queen('l', 3, 7-0), new King('l', 4, 7-0), new Bishop('l', 5, 7-0), new Knight('l', 6, 7-0), new Rook('l', 7, 7-0)])

        this.selectedPiece = null;
        this.nextColor = 'l'; // Switches between 'l' (light) and 'd' (dark)

        this.black = new SideData('d', this.pieces[0][4], this.pieces[0][0], this.pieces[0][7]);
        this.white = new SideData('l', this.pieces[7][4], this.pieces[7][0], this.pieces[7][7]);
    }
    draw() {

        // Draw Board
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 10000, 10000)
        this.ctx.fillStyle = '#f0d9b5';
        this.ctx.fillRect(0, 0, 800, 800)
        this.ctx.fillStyle = '#b58863';
        let n = 1;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (n % 2 == 0) {
                    this.ctx.fillRect(j*100 - (i % 2 * 100), i*100, 100, 100)
                }
                n++;
            }
        }
        
        // Draw pieces
        for (const rank of this.pieces) {
            for (const piece of rank) {
                piece.draw(this.ctx);
            }
        }
    }
    click(x, y) {
        if (!this.selectedPiece) {
            if (this.pieces[y][x].type == 'e') return;
            this.selectedPiece = this.pieces[y][x];
            this.selectedPiece.selected = true;
            if (this.nextColor == this.selectedPiece.color) {
                const validMoves = this.selectedPiece.getValidMoves(this);
                for (const move of validMoves) {
                    if (this.pieces[move.y][move.x].type == 'e') this.pieces[move.y][move.x].highlighted = true;
                    else this.pieces[move.y][move.x].highlighted = true;
                }
            }
            this.draw();
            return;
        }

        if (this.selectedPiece == this.pieces[y][x]) {
            this.selectedPiece.selected = false;
            this.selectedPiece = null;
            this.unSelectAll();
            this.draw();
            return;
        }

        if (this.selectedPiece.isValidMove(this.pieces, x, y) && this.selectedPiece.color == this.nextColor) {
            this.move(this.selectedPiece.x, this.selectedPiece.y, x, y);
        }
        else if (this.pieces[y][x].color == this.selectedPiece.color) {
            this.selectedPiece.selected = false;
            this.selectedPiece = this.pieces[y][x];
            this.unSelectAll();
            this.selectedPiece.selected = true;
            if (this.selectedPiece.color == this.nextColor) {
                const validMoves = this.selectedPiece.getValidMoves(this);
                for (const move of validMoves) {
                    if (this.pieces[move.y][move.x].type == 'e') this.pieces[move.y][move.x].highlighted = true;
                    else this.pieces[move.y][move.x].highlighted = true;
                }
            }
            this.draw();
        } else {
            this.selectedPiece.selected = false;
            this.selectedPiece = null;
            this.unSelectAll();
            this.draw();
        }
    }
    move(x1, y1, x2, y2, checking) {
        const move = new Move({ x: x1, y: y1 }, {x: x2, y: y2}, this.pieces[y1][x1], this.pieces[y2][x2])
        this.pieces[y2][x2] = this.pieces[y1][x1];
        this.pieces[y2][x2].x = x2;
        this.pieces[y2][x2].y = y2;
        this.pieces[y1][x1] = new Empty(x1, y1);
        this.nextColor = this.nextColor == 'l' ? 'd' : 'l';

        if (!checking) {
            this.selectedPiece.selected = false;
            this.unSelectAll();
            this.draw();
            this.selectedPiece = null;
            // Audio
            let audio;
            if (move.pieceCaptured.type != 'e') audio = new Audio('http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3')
            else audio = new Audio('http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3')
            audio.play();

            // Update side data
            if (this.pieces[y2][x2].type == 'r') {
                this.white.rookMoved(this.pieces, x2, y2);
                this.black.rookMoved(this.pieces, x2, y2);
            } else if (this.pieces[y2][x2].type == 'k') {
                this.white.kingMoved(this.pieces, x2, y2);
                this.black.kingMoved(this.pieces, x2, y2);
            }
            console.log(this.white.kingHasMoved, this.black.kingHasMoved)
        }

        

        return move;
    }
    /**
     * 
     * @param {Move} move 
     */
    undoMove(move) {
        this.pieces[move.to.y][move.to.x] = move.pieceCaptured;
        this.pieces[move.from.y][move.from.x] = move.piece;
        move.piece.x = move.from.x;
        move.piece.y = move.from.y;
        this.nextColor = this.nextColor == 'l' ? 'd' : 'l'
    }
    unSelectAll() {
        for (const rank of this.pieces) {
            for (const piece of rank) {
                piece.highlighted = false;
                if (piece.type != 'e') piece.selected = false;
            }
        }
    }
}
