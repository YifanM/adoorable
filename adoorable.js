var levelTimer;
var gameLoopInterval;

var playerX;
var playerY;
var playerSrc;
var playerHeight;
var playerWidth;

var origPlayerX;
var origPlayerY;

var keyX;
var keyY;
var keySrc;
var keyHeight;
var keyWidth;

var doorX;
var doorY;
var doorSrc;
var doorHeight;
var doorWidth;

var timerX;
var timerY;
var timerRadius = 25;

var winHeight;
var winWidth;
var canHeight;
var canWidth;

var boundaryLeft;
var boundaryTop;
var boundaryRight;
var boundaryBottom;

var gameState; //0 = instructions, 1 = tutorial, 2 = game
var levelState;
var levelTime;
var elapsedLoops = 0;

var keysPressed = {};
var travelledPath = {};
var trailPath = [];

var objectLocations = {};
var xCollided = false;
var yCollided = false;
var horiCollided = false;
var vertCollided = false;
var keyFound;

var doorLock = false;
var gameIsOver = false;

function gameLoop(ctx) {
	if (gameState === 2) elapsedLoops += 1;
	movePlayer(ctx);
	drawTrail(ctx);
	drawObjects(ctx);
	if (!gameIsOver) gameLoopInterval = window.requestAnimationFrame(function() { gameLoop(ctx) });
}

function playerFinalLoop(ctx) {
	elapsedLoops += 1;
	drawPlayerOnPath(ctx);
	drawObjects(ctx);
}

function finalLoop(ctx) {
	elapsedLoops += 1;
	drawPath(ctx);
	drawObjects(ctx);
}

$(document).ready(function() {
	var c = $("canvas")[0];
	var ctx = c.getContext("2d");

	winHeight = $(window).height();
	winWidth = $(window).width();
	console.log(winHeight, winWidth);
	if (winHeight < 657 || winWidth < 1422) alert("Warning: your window's size might be too small.");
	winHeight = 788;
	winWidth = 1707;
	c.height = winHeight*(8/10);
	c.width = winWidth*(8/10);
	ctx.lineWidth = 3;
	canHeight = c.height;
	canWidth = c.width;

	$("canvas").fadeIn();

	$(window).resize(function() {
		winHeight = $(window).height();
		winWidth = $(window).width();
		if (winHeight < 657 || winWidth < 1422) alert("Warning: your window's size might be too small.");
		winHeight = 788;
		winWidth = 1707;
		c.height = winHeight*(8/10);
		c.width = winWidth*(8/10);
		canHeight = c.height;
		canWidth = c.width;
		$("canvas").fadeOut();
		$("canvas").fadeIn();
		doorLock = false;
		initialize(c, ctx);
		if (gameIsOver) {
			gameIsOver = false;
			window.requestAnimationFrame(function() { gameLoop(ctx) });
		}
	});

	initialize(c, ctx);
	window.requestAnimationFrame(function() { gameLoop(ctx) });

	$(document).keydown(function(e) {
		keysPressed[e.which] = true;
	});

	$(document).keyup(function(e) {
		delete keysPressed[e.which];
	});
});