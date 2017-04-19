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

var winHeight;
var winWidth;

var gameState; //0 = instructions, 1 = tutorial, 2 = game

var keysPressed = {};
var travelledPath = [];
var trailPath = [];

var objectLocations = {};
var xCollided = false;
var yCollided = false;
var horiCollided = false;
var vertCollided = false;
var keyFound;

function movePlayer(ctx) {

	if (gameState === 0 && (keysPressed[37] || keysPressed[38] || keysPressed[39] || keysPressed[40])) {
		gameState = 1;
	} else if (gameState === 0) {
		return;
	}

	origPlayerX = playerX;
	origPlayerY = playerY;

	if (keysPressed[37]) playerX = playerX - 3.5; //left
	if (keysPressed[38]) playerY = playerY - 3.5; //up
	if (keysPressed[39]) playerX = playerX + 3.5; //right
	if (keysPressed[40]) playerY = playerY + 3.5; //down

	detectCollisions();

	if (xCollided && horiCollided) playerX = origPlayerX;
	if (yCollided && vertCollided) playerY = origPlayerY;

	xCollided = false;
	yCollided = false;
	horiCollided = false;
	vertCollided = false;

	playerX = Math.max(0, playerX);
	playerX = Math.min(winWidth*(8/10) - playerWidth, playerX);
	playerY = Math.max(0, playerY);
	playerY = Math.min(winHeight*(8/10) - playerHeight, playerY);

	if (gameState === 2 && (origPlayerX !== playerX || origPlayerY !== playerY)) {
		travelledPath.push([playerX, playerY]);
	}

	trailPath.push([playerX, playerY]);
	if (trailPath.length > 15) {
		trailPath.shift();
	}

	ctx.drawImage(playerSrc, playerX, playerY);
	return;
}

function drawTrail(ctx) {
	for (var i = 14; i > -1; i--) {
		if (trailPath[i]) {
			ctx.beginPath();
			ctx.arc(trailPath[i][0] + playerHeight/2, trailPath[i][1] + playerWidth/2, i*1.2, 0, 2*Math.PI, false);
			ctx.fill();
			ctx.closePath();
		} else {
			break;
		}
	}
}

function drawObjects(c, ctx) {
	var rectHeight = 300;
	var rectWidth = 20;
	var rectX = c.width * (5 / 8) - rectWidth / 2;
	var rectY = c.height / 2 -rectHeight / 2;
	ctx.drawImage(doorSrc, doorX, doorY);
	if (!keyFound) ctx.drawImage(keySrc, keyX, keyY);
	ctx.fillStyle = "#33334d";
	ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
	ctx.fillStyle = "black";
}

function gameLoop(c, ctx) {
	if (gameState !== 0) ctx.clearRect(0, 0, winWidth*(8/10), winHeight*(8/10));
	movePlayer(ctx);
	if (gameState !== 0) {
		drawTrail(ctx);
		drawObjects(c, ctx);
	}
}

$(document).ready(function() {
	var c = $("canvas")[0];
	var ctx = c.getContext("2d");

	winHeight = $(window).height();
	winWidth = $(window).width();
	c.height = winHeight*(8/10);
	c.width = winWidth*(8/10);

	$("canvas").fadeIn();

	$(window).resize(function() {
		var winHeight = $(window).height();
		var winWidth = $(window).width();
		c.height = winHeight*(8/10);
		c.width = winWidth*(8/10);
		$("canvas").fadeOut();
		$("canvas").fadeIn();
		initialize(c, ctx);
	});

	initialize(c, ctx);

	setInterval(function() { gameLoop(c, ctx) }, 20);

	$(document).keydown(function(e) {
		keysPressed[e.which] = true;
	});

	$(document).keyup(function(e) {
		delete keysPressed[e.which];
	});
});