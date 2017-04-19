function initialize(c, ctx) {
	
	playerSrc = new Image(); // consider making player a circle instead?
	
	playerSrc.onload = function() {
		playerHeight = playerSrc.naturalHeight;
		playerWidth = playerSrc.naturalWidth;
		playerX = c.width / 4 - playerWidth / 2;
		playerY = c.height / 2 - playerHeight / 2;
		ctx.drawImage(playerSrc, playerX, playerY);
	}

	playerSrc.src = "player.png";

	keySrc = new Image();
	
	keySrc.onload = function() {
		keyHeight = keySrc.naturalHeight;
		keyWidth = keySrc.naturalWidth;
		keyX = c.width / 2 - keyWidth / 2;
		keyY = c.height / 2 - keyHeight / 2;
		ctx.drawImage(keySrc, keyX, keyY);
	}

	keySrc.src = "key.jpg";

	doorSrc = new Image();
	
	doorSrc.onload = function() {
		doorHeight = doorSrc.naturalHeight;
		doorWidth = doorSrc.naturalWidth;
		doorX = c.width * (3 / 4) - doorWidth / 2;
		doorY = c.height / 2 - doorHeight / 2;
		ctx.drawImage(doorSrc, doorX, doorY);
	}

	doorSrc.src = "lockedDoor.png";

	var arrowKeys = new Image();

	arrowKeys.onload = function () {
		var arrowKeyHeight = arrowKeys.naturalHeight;
		var arrowKeyWidth = arrowKeys.naturalWidth;
		var arrowKeyX = c.width / 2 - arrowKeyWidth / 2;
		var arrowKeyY = c.height * (3 / 4) - arrowKeyHeight / 2;
		ctx.drawImage(arrowKeys, arrowKeyX, arrowKeyY);
	}

	arrowKeys.src = "arrowKeys.png";

	var rectHeight = 300;
	var rectWidth = 20;
	var rectX = c.width * (5 / 8) - rectWidth / 2;
	var rectY = c.height / 2 -rectHeight / 2;
	ctx.fillStyle = "#33334d";
	ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
	ctx.fillStyle = "black";

	objectLocations["startingRect"] = {
		type: "square",
		x: rectX,
		y: rectY,
		w: rectWidth,
		h: rectHeight,
	};

	gameState = 0;
	keyFound = false;

}

function initializeMain(c, ctx) {
	$("canvas").fadeOut();
	$("canvas").fadeIn();
}