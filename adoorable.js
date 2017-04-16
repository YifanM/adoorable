var playerX;
var playerY;
var playerSrc;
var playerHeight;
var playerWidth;
var winHeight;
var winWidth;

var gameState = 0;

var keysPressed = {};
var travelledPath = [];
var trailPath = [];

function initialize(c, ctx) {
	
	playerSrc = new Image();
	
	playerSrc.onload = function() {
		playerHeight = playerSrc.naturalHeight;
		playerWidth = playerSrc.naturalWidth;
		playerX = c.width / 4 - playerWidth / 2;
		playerY = c.height / 2 - playerHeight / 2;
		ctx.drawImage(playerSrc, playerX, playerY);
	}

	playerSrc.src = "player.png";

}

function movePlayer(ctx) {

	let origPlayerX = playerX;
	let origPlayerY = playerY;

	if (keysPressed[37]) playerX = playerX - 3; //left
	if (keysPressed[38]) playerY = playerY - 3; //up
	if (keysPressed[39]) playerX = playerX + 3; //right
	if (keysPressed[40]) playerY = playerY + 3; //down

	playerX = Math.max(0, playerX);
	playerX = Math.min(winWidth*(8/10) - playerWidth, playerX);
	playerY = Math.max(0, playerY);
	playerY = Math.min(winHeight*(8/10) - playerHeight, playerY);

	if (gameState !== 0 && (origPlayerX !== playerX || origPlayerY !== playerY)) {
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

$(document).ready(function() {
	var c = $("canvas")[0];
	var ctx = c.getContext("2d");
	ctx.fillStyle = "black";

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

	setInterval(function() {
		ctx.clearRect(0, 0, winWidth*(8/10), winHeight*(8/10));
		movePlayer(ctx);
		drawTrail(ctx);
	}, 20);

	$(document).keydown(function(e) {
		keysPressed[e.which] = true;
	});

	$(document).keyup(function(e) {
		delete keysPressed[e.which];
	});
});