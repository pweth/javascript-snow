const snowfall = {};
snowfall.canvas = document.getElementById("snowfall-element");
snowfall.context = snowfall.canvas.getContext("2d");
// Snowflake constructor
snowfall.snowflake = function () {
	this.size = Math.random() * 2 + 2
	this.x = (Math.random() * snowfall.canvas.width - this.size - 1) + this.size + 1;
	this.baseX = this.x;
	this.distance = Math.random() * 50 + 1;
	this.opacity = Math.random();
	this.radians = Math.random() * Math.PI * 2;
	this.fallSpeed = Math.random() * 1.5 + 0.5;
	this.y = (Math.random() * snowfall.canvas.height - this.size - 1) + this.size + 1;
	this.draw = () => {
		//Moves snowflakes down the screen, pushing them to the top when they go off the canvas
		if (this.y > snowfall.canvas.height + this.size) {
			this.y = -this.size;
		} else {
			this.y += this.fallSpeed;
		}
		//Side to side motion on snowflakes
		this.radians += 0.02;
		this.x = this.baseX + this.distance * Math.sin(this.radians);
		//Draws on the snowflake
		snowfall.context.fillStyle = `rgba(255,255,255,${this.opacity})`;
		snowfall.context.fillRect(this.x, this.y, this.size, this.size);
	}
}
// Initial setup function
snowfall.setup = () => {
	snowfall.canvas.width = snowfall.context.canvas.clientWidth;
	snowfall.canvas.height = snowfall.context.canvas.clientHeight;
	snowfall.flakes = [];
	for (let x = 0; x < Math.ceil((snowfall.canvas.width * snowfall.canvas.height) / 15000); x++) {
		snowfall.flakes.push(new snowfall.snowflake());
	}
}
window.addEventListener("resize", snowfall.setup);
//Animation loop function
snowfall.animate = () => {
	requestAnimationFrame(snowfall.animate);
	snowfall.context.clearRect(0, 0, snowfall.canvas.width, snowfall.canvas.height);
	for (let snowflake of snowfall.flakes) {
		snowflake.draw();
	}
}
//Let it snow!
snowfall.setup();
snowfall.animate();