const rowCnt = 24;
const colCnt = 35;
const snakeColor = "#ffa500";
const foodColor = "#ff0000";

var canvas = function(){
	var mainUi = document.getElementById('mainUI');
	return mainUi;
}();

var Snake = function(bodyArr){
	this.body = bodyArr;
	this.head = this.body[this.body.length - 1];
};
Snake.prototype = {
	constructor:Snake,
	isDie: function(){
		var tempArr = body.slice(0, body.length - 1);
		if (head in tempArr)
			return true;
		if(head.X < 0 || head.X >= colCnt || head.Y < 0 || head.Y >= rowCnt )
			return true;
		return false;
	}
}

function getInitSnake(){
	return new Snake([new Location(1, 1), new Location(2, 1), new Location(3, 1)]);
}

var snake = getInitSnake();

const canvasHeight = canvas.height;
const canvasWidth = canvas.width;

const cellHeight = canvasHeight / rowCnt;
const cellWidth = canvasWidth / colCnt;

var ctx = canvas.getContext('2d');

var drawRect = function(rect, color){
	ctx.fillStyle = color;
	ctx.fillRect(rect.m_location.X, rect.m_location.Y, rect.m_size.m_width, rect.m_size.m_height);
};



//class location
function Location(x, y){
	this.X = x;
	this.Y = y;
}
Location.prototype = {
	constructor:Location
};

//class Size
function Size(width, height){
	this.m_width = width;
	this.m_height = height;
}
Size.prototype = {
	constructor:Size
}

//class Rectangle
function Rectangle(location, size)
{
	this.m_location = location;
	this.m_size = size;
}
Rectangle.prototype = {
	constructor: Rectangle
};

//将location转换成具体的位置（所占的矩形，由Rectangle表示）
var locToRect = function(location){
	var realLeftTop = new Location(location.X * cellWidth, location.Y * cellHeight);
	return new Rectangle(realLeftTop, new Size(cellWidth, cellHeight));
}

var getRandFoodLoc = function(){
	var loc;
	do{
		var foodX = Math.floor(Math.random() * colCnt);
		var foodY = Math.floor(Math.random() * rowCnt);
		loc = new Location(foodX, foodY);
	} while (loc in snake.body)
	return loc;
}

function init(){
	var foodLoc = getRandFoodLoc();
	var foodRect = locToRect(foodLoc);
	drawRect(foodRect, foodColor);
	for(index in snake.body)
	{
		var partialBodyRect = locToRect(snake.body[index]);
		drawRect(partialBodyRect, snakeColor);
		//drawRect(snake.body[index], snakeColor);
	}
}

init();