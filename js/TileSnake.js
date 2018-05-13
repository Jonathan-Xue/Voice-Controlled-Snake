var x, y;
var r, g, b;
var bounds;
var alive;
var location;
var direction;

class TileSnake {
	constructor(x, y, r, g, b, bounds) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.g = g;
		this.b = b;
		this.bounds = bounds;
		this.alive = true;
		this.direction = [0,0];
		this.location = [];
		this.location.push([x, y])
	}

	setColor(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	
	collision(){
		//Check Length Of Location Array vs Lenght Of Location Array Without Duplicates
		if(this.location.length != Array.from(new Set(this.location.map(JSON.stringify)), JSON.parse).length){
			//console.log(Array.from(new Set(this.location.map(JSON.stringify)), JSON.parse))
			//console.log(this.location)
			this.alive = false;
		}
	}
	
	setDirection(x,y){
		this.direction[0] = x;
		this.direction[1] = y;
	}

	update(foodInfo){
		//Movement
		fill(r, g, b);
		this.location.push([this.location[this.location.length - 1][0] + this.direction[0], this.location[this.location.length - 1][1] + this.direction[1]]); // First Index -> Snake Tail, Last Index -> Snake Head
		//Out Of Bounds (x)
		if (this.location[this.location.length - 1][0] > gameBoard.length - 1) {
			if(this.bounds) this.alive = false;
			else this.location[this.location.length - 1][0] = 0;
		}
		else if (this.location[this.location.length - 1][0] < 0) {
			if(this.bounds) this.alive = false
			else this.location[this.location.length - 1][0] = gameBoard.length - 1;
		}
		//Out Of bounds (y)
		if (this.location[this.location.length - 1][1] > gameBoard[0].length - 1) {
			if(this.bounds) this.alive = false;
		    else this.location[this.location.length - 1][1] = 0;
		}
		else if (this.location[this.location.length - 1][1] < 0) {
		    if(this.bounds) this.alive = false;
		    else this.location[this.location.length - 1][1] = gameBoard[0].length - 1;
		}
		//Length Adjustment(Food) & Collision Detection
		for(i = 0; i < foodInfo.length; i++){
			if(this.location[this.location.length - 1][0] == foodInfo[i].location[0][0] && this.location[this.location.length - 1][1] == foodInfo[i].location[0][1]){
				foodInfo.splice(i, 1)
				this.collision();
				return true;
			}
    	}
    	this.location.shift();
    	this.collision();
    	return false;
	}

	draw() {
		fill(255, 255, 255)
		stroke(50, 50, 50);
		strokeWeight(1);
		for (i = 0; i < this.location.length; i++) {
			rect(TILESIZE * this.location[i][0], TILESIZE * this.location[i][1], TILESIZE, TILESIZE)
		}
	}
}