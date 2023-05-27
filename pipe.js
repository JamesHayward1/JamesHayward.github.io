class pipe {
    
    constructor(x, y, gap, width,scored) {
        this.x = x;
        this.y = y;
        this.gap = gap;
        this.width = width;
        this.scored = scored;
    }

    show() {
        fill(134,255,102,255)
        imageMode(CORNER)
        // bottom pipe
        rect(this.x + 10, this.y, this.width - 20, 625)
        rect(this.x, this.y, this.width, 50)
        
        // top pipe
        rect(this.x + 10, (this.y - this.gap - 625), this.width - 20, 625)
        rect(this.x, (this.y - this.gap - 50), this.width, 50)
    }
}