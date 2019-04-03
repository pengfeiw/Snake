const rowCnt = 24;
const colCnt = 35;
const snakeColor = "#ffa500";
const foodColor = "#ff0000";

var start = false;

var canvas = function() {
	var mainUi = document.getElementById('mainUI');
	return mainUi;
}();

function addEvent() {
	// key event - use DOM element as object
	canvas.addEventListener('keydown', move, true);
	canvas.focus();
	// key event - use window as object
	window.addEventListener('keydown', move, true);
}
addEvent();
// canvas.addEventListener('keydown', move, true);
// canvas.focus();
// // key event - use window as object
// window.addEventListener('keydown', move, true);

var ctx = canvas.getContext('2d');
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const cellHeight = canvasHeight / rowCnt;
const cellWidth = canvasWidth / colCnt;

var clearCanvas = function() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

function clearRects(rects) {
	for (rectIndex in rects) {
		var rect = rects[rectIndex];
		ctx.clearRect(rect.m_location.X, rect.m_location.Y, rect.m_size.m_width, rect.m_size.m_height);
	}
}

function gameOver() {
	clearCanvas();
	ctx.fillStyle = "#ff0000"
	ctx.font = '48px serif';
	ctx.fillText('Hello world', 10, 50);
}
var Snake = function(bodyArr) {
	this.body = bodyArr;
	this.head = this.body[this.body.length - 1];
	this.tail = this.body[0];
};
var Direction = Object.freeze({"Top":0, "Right":1, "Down":2, "Left":3});
Snake.prototype = {
	direction: Direction.Right,
	constructor: Snake,
	isDie: function() {
		var tempArr = this.body.slice(0, this.body.length - 1);
		if (this.head in tempArr)
			return true;
		if (this.head.X < 0 || this.head.X >= colCnt || this.head.Y < 0 || this.head.Y >= rowCnt)
			return true;
		return false;
	},
	left: function() {
		this.direction = Direction.Left;
		for (var i = 0; i < this.body.length - 1; i++) {
			this.body[i] = this.body[i + 1];
		}
		this.body[this.body.length - 1] = new Location(this.body[this.body.length - 1].X - 1, this.body[this.body.length - 1].Y);
		if (this.isDie()) {
			gameOver();
		}
	},
	right: function() {
		this.direction = Direction.Right;
		for (var i = 0; i < this.body.length - 1; i++) {
			this.body[i] = this.body[i + 1];
		}
		this.body[this.body.length - 1] = new Location(this.body[this.body.length - 1].X + 1, this.body[this.body.length - 1].Y);
		if (this.isDie()) {
			gameOver();
		}
	},
	top: function() {
		this.direction = Direction.Top;
		for (var i = 0; i < this.body.length - 1; i++) {
			this.body[i] = this.body[i + 1];
		}
		this.body[this.body.length - 1] = new Location(this.body[this.body.length - 1].X, this.body[this.body.length - 1].Y - 1);
		if (this.isDie()) {
			gameOver();
		}
	},
	down: function() {
		this.direction = Direction.Down;
		for (var i = 0; i < this.body.length - 1; i++) {
			this.body[i] = this.body[i + 1];
		}
		this.body[this.body.length - 1] = new Location(this.body[this.body.length - 1].X, this.body[this.body.length - 1].Y + 1);
		if (this.isDie()) {
			gameOver();
		}
	}
}

function getInitSnake() {
	return new Snake([new Location(1, 1), new Location(2, 1), new Location(3, 1)]);
}

var snake = getInitSnake();

function move(e) {
	if(start === false)
	{
		start = true;
		setInterval(AutoMove, 1000);
	}
	var keyID = e.keyCode ? e.keyCode : e.which;
	var keyID = e.keyCode ? e.keyCode : e.which;
	var oldTailRect = locToRect(snake.body[0]);
	if (keyID === 38 || keyID === 87) { // up arrow and W
		// snake.top();
		snake.direction = Direction.Top;
		e.preventDefault();
	}
	else if (keyID === 39 || keyID === 68){ // right arrow and D
		// snake.right();
		snake.direction = Direction.Right;
		e.preventDefault();
	}
	else if (keyID === 40 || keyID === 83) { // down arrow and S
		// snake.down();
		snake.direction = Direction.Down;
		e.preventDefault();
	}
	else if (keyID === 37 || keyID === 65) { // left arrow and A
		// snake.left();
		snake.direction = Direction.Left;
		e.preventDefault();
	}
};

function AutoMove(){
	if (start === true)
	{
		var oldTailRect = locToRect(snake.body[0]);
		switch (snake.direction) {
		case Direction.Top:
			snake.top();
		break;
		case Direction.Right:
			snake.right();
		break;
		case Direction.Down:
			snake.down();
		break;
		case Direction.Left:
			snake.left();
		break;
		default:
			break;
	}
	if (snake.isDie() === false)
	{
		clearRects([oldTailRect]);
		drawRect(locToRect(snake.body[snake.body.length - 1]), snakeColor);
	}
	}
	
}



var drawRect = function(rect, color) {
	ctx.fillStyle = color;
	ctx.fillRect(rect.m_location.X, rect.m_location.Y, rect.m_size.m_width, rect.m_size.m_height);
};



//class location
function Location(x, y) {
	this.X = x;
	this.Y = y;
}
Location.prototype = {
	constructor: Location
};

//class Size
function Size(width, height) {
	this.m_width = width;
	this.m_height = height;
}
Size.prototype = {
	constructor: Size
}

//class Rectangle
function Rectangle(location, size) {
	this.m_location = location;
	this.m_size = size;
}
Rectangle.prototype = {
	constructor: Rectangle
};

//将location转换成具体的位置（所占的矩形，由Rectangle表示）
var locToRect = function(location) {
	var realLeftTop = new Location(location.X * cellWidth, location.Y * cellHeight);
	return new Rectangle(realLeftTop, new Size(cellWidth, cellHeight));
}

var getRandFoodLoc = function() {
	var loc;
	do {
		var foodX = Math.floor(Math.random() * colCnt);
		var foodY = Math.floor(Math.random() * rowCnt);
		loc = new Location(foodX, foodY);
	} while (loc in snake.body)
	return loc;
}

function init() {
	var foodLoc = getRandFoodLoc();
	var foodRect = locToRect(foodLoc);
	drawRect(foodRect, foodColor);
	for (index in snake.body) {
		var partialBodyRect = locToRect(snake.body[index]);
		drawRect(partialBodyRect, snakeColor);
		//drawRect(snake.body[index], snakeColor);
	}
}

init();