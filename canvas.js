const rowCnt = 24;
const colCnt = 32;
var canvas = (function(){
	var mainUi = document.getElementById("mainUI");
	return mainUi;
})();

var height = canvas.offsetHeight;
var width = canvas.offsetWidth;
var cellWidth = width / colCnt;
var cellHeight = width / rowCnt;
var snake = {
	body = [];
}

var food;

//Class Vector
var Vector = function(x, y){
	var X = x;
	Var Y = y;
}

Vector.prototype = {
	constructor = Vector;
}

//Class Point
var Point = function(x, y){
	var X = x;
	var Y = y;
}

Point.prototype = {
	constructor = Point;
	toString() = function(){
		return "(" + X.toString() + "," +Y.toString + ")";
	}
	var moveVect(vec){
		X += vec.X;
		Y += vec.Y;
	}
}

var getRandFoodPos = function(){
	var foodX = Math.floor(Math.Random() * rowCnt);
	var foodY = Math.floor(Math.Random() * colCnt);
	return new Point(foodX, foodY);
}

var init = function(){
	food = getRandFoodPos();

}