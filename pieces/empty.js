class Empty {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'e';
        this.highlighted = false;
    }
    highlight(ctx) {
        ctx.fillStyle = 'black';
        ctx.globalAlpha = 0.2;
        circle(ctx, this.x * 100 + 50, this.y * 100 + 50, 17)
        ctx.globalAlpha = 1.0;
    }
    draw(ctx) {
        if (this.highlighted) return this.highlight(ctx);
    }
}