class ball {
    
    constructor(x, y, diameter, acceleration, velocity) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.acceleration = acceleration;
        this.velocity = velocity;
    }

    show() {
        fill(255, 165, 0)
        triangle(this.x + 30, this.y, this.x + 15, this.y + 10, this.x + 15, this.y - 10)
        fill(254,248,102,255)
        ellipse(this.x, this.y, this.diameter)
        fill(0, 0, 0)
        ellipse(this.x + 12, this.y - 2, 5)
        line(this.x - 10, this.y + 22, this.x - 13, this.y + 30)
        line(this.x + 10, this.y + 22, this.x + 13, this.y + 30)
        line(this.x - 13, this.y + 30, this.x - 7, this.y + 33)
        line(this.x + 13, this.y + 30, this.x + 19, this.y + 27)
    }
}