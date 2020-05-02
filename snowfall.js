//Snow fall object
let sF = {};
sF.canvas = document.getElementById("snowfall-element");
sF.c = sF.canvas.getContext("2d");
//Snowflake constructor
sF.ii = function () {
	this.size = Math.random() * 2 + 2
	this.x = (Math.random() * sF.canvas.width - this.size - 1) + this.size + 1;
	this.ogX = this.x;
	this.dist = Math.random() * 50 + 1;
	this.opacity = Math.random();
	this.radians = Math.random() * Math.PI * 2;
	this.fallSpeed = Math.random() * 1.5 + 0.5;
	this.offSet = 0;
	this.y = (Math.random() * sF.canvas.height - this.size - 1) + this.size + 1;
	this.draw = function () {
		//Moves snowflakes down the screen, pushing them to the top when they go off the canvas
		if (this.y > sF.canvas.height + this.size) {
			this.y = -this.size;
		} else {
			this.y += this.fallSpeed;
		}
		//Side to side motion on snowflakes
		this.radians += 0.02;
		this.x = this.ogX + this.dist * Math.sin(this.radians);
		//Draws on the snowflake
		sF.c.fillStyle = "rgba(255,255,255," + this.opacity + ")";
		sF.c.fillRect(this.x + this.offSet, this.y, this.size, this.size);
	}
}
//Setup function
sF.i = () => {
	sF.canvas.width = window.innerWidth;
	sF.canvas.height = window.innerHeight;
	sF.iii = [];
	for (let x = 0; x < Math.ceil((sF.canvas.width * sF.canvas.height) / 15000); x++) {
		sF.iii.push(new sF.ii());
	}
}
window.addEventListener("resize", sF.i);
//Animation loop function
sF.iv = () => {
	requestAnimationFrame(sF.iv);
	sF.c.clearRect(0, 0, sF.canvas.width, sF.canvas.height);
	for (let x in sF.iii) {
		sF.iii[x].draw();
	}
}
//Let it snow!
sF.i();
sF.iv();