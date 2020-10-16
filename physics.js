var canvas = document.getElementById("physics-js");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

class Vector {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	
	cart2canv() {
		this.y *= -1;
		return this;
	}

	add(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	}

	sub(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	}
	
	mul(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}
	
	div(scalar) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}
	
	mag() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}
	
	limit(max) {
		let mag = this.mag()
		if (mag > max) {
			this.mul(max);
			this.div(mag);
		}
	}
}

class Circle {
	constructor(pos, r, fill) {
		this.pos = pos || new Vector;
		this.r = r || 1;
		this.fill = fill || false;
	}
	
	draw() {
		ctx.strokeStyle = "#000";
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
		if (this.fill) {
			ctx.fill();
		} else {
			ctx.stroke();
		}
	}
}

class Particle {
	constructor(pos, vel, acc, r) {
		this.pos = pos || new Vector(width/2, height/2);
		this.vel = vel || new Vector(0, 0);
		this.acc = acc || new Vector(0, 0.01);
		this.r = r || 10;
		this.circle = new Circle(this.pos, this.r);
	}
	
	resize() {
		if (this.circle.r !== this.r) {
			this.circle.r = this.r;
		}
	}
	
	edges() {
		if (this.pos.x < this.r) {
			this.pos.x = this.r;
			this.vel.x *= -1;
		} else if (this.pos.x > width - this.r) {
			this.pos.x = width - this.r;
			this.vel.x *= -1;
		}
		if (this.pos.y < this.r)  {
			this.pos.y = this.r;
			this.vel.y *= -1;
		} else if (this.pos.y > height - this.r) {
			this.pos.y = height - this.r;
			this.vel.y *= -1;
		}
	}
	
	update() {
		this.resize();
		this.vel.add(this.acc);
		this.vel.limit(10);
		this.pos.add(this.vel);
		return this;
	}

	draw() {
		this.update();
		this.edges();
		this.circle.draw();
	}
}

function drawMany(particles) {
	for (let i = 0; i < particles.length; i++) {
		particles[i].draw();
	}
}

p = new Particle();
q = new Particle();
q.pos.x -= 25;
q.vel.x = 1;


function draw() {
	ctx.clearRect(0, 0, width, height);
	drawMany([p, q]);
}

setInterval(draw, 1000/60);
