var x, y;
var location;

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.location = [];
        this.location.push([x, y])
    }

    draw() {
        fill(255, 0, 0)
        stroke(50, 50, 50);
        strokeWeight(1);
        rect(TILESIZE * this.location[0][0], TILESIZE * this.location[0][1], TILESIZE, TILESIZE)
    }
}