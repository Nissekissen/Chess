window.onload = () => {
    document.getElementById("body").style.margin = 0;
    document.getElementById("body").style.overflow = 'hidden';

    const canvas = document.getElementById("canvas");
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");

    const board = new Board(ctx);
    board.draw();

    window.addEventListener('mouseup', event => {
        let x = Math.floor(event.offsetX / 100);
        let y = Math.floor(event.offsetY / 100);
        if (x >= 0 && x < 8 && y >= 0 && y < 8) board.click(x, y);
    })
};

