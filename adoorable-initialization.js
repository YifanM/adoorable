function initialize(c, ctx) {

	clearTimeout(levelTimer);
	trailPath = [];
	ctx.clearRect(0, 0, winWidth*(8/10), winHeight*(8/10));

	playerSrc = new Image(); // consider making player a circle instead?
	
	playerSrc.onload = function() {
		playerHeight = playerSrc.naturalHeight;
		playerWidth = playerSrc.naturalWidth;
		playerX = canWidth / 4 - playerWidth / 2;
		playerY = canHeight / 2 - playerHeight / 2;
		ctx.drawImage(playerSrc, playerX, playerY);
	}

	playerSrc.src = "resources/player.png";

	keySrc = new Image();
	
	keySrc.onload = function() {
		keyHeight = keySrc.naturalHeight;
		keyWidth = keySrc.naturalWidth;
		keyX = canWidth / 2 - keyWidth / 2;
		keyY = canHeight / 2 - keyHeight / 2;
		ctx.drawImage(keySrc, keyX, keyY);
	}

	keySrc.src = "resources/key.jpg";

	doorSrc = new Image();
	
	doorSrc.onload = function() {
		doorHeight = doorSrc.naturalHeight;
		doorWidth = doorSrc.naturalWidth;
		if (!doorLock) {
			doorX = canWidth * (3 / 4) - doorWidth / 2;
			doorY = canHeight / 2 - doorHeight / 2;
		}
		ctx.drawImage(doorSrc, doorX, doorY);
	}

	doorSrc.src = "resources/lockedDoor.png";

	var arrowKeys = new Image();

	arrowKeys.onload = function () {
		var arrowKeyHeight = arrowKeys.naturalHeight;
		var arrowKeyWidth = arrowKeys.naturalWidth;
		var arrowKeyX = canWidth / 2 - arrowKeyWidth / 2;
		var arrowKeyY = canHeight * (3 / 4) - arrowKeyHeight / 2;
		ctx.drawImage(arrowKeys, arrowKeyX, arrowKeyY);
	}

	arrowKeys.src = "resources/arrowKeys.png";

	var rectHeight = 300;
	var rectWidth = 20;
	var rectX = canWidth * (5 / 8) - rectWidth / 2;
	var rectY = canHeight / 2 -rectHeight / 2;

	objectLocations = {};
	objectLocations["startingRect"] = {
		type: "square",
		x: rectX,
		y: rectY,
		w: rectWidth,
		h: rectHeight,
	};

	gameState = 0;
	keyFound = false;
	boundaryLeft = 0;
	boundaryRight = winWidth*(8/10);
	boundaryTop = 0;
	boundaryBottom = winHeight*(8/10);

}

function initializeMain(level) {
	$("canvas").fadeOut();

	clearTimeout(levelTimer);
	gameState = 2;
	elapsedLoops = 0;
	objectLocations = {};
	trailPath = [];

	keyFound = false;
	doorLock = true;
	doorSrc.src = "resources/lockedDoor.png";

	if (!level || level === 0) {
		levelState = 0;
		travelledPath[levelState] = [];
		levelTime = 3700;

		boundaryLeft = canWidth*(0.3/10);
		boundaryTop = canHeight*(5/10) - canWidth*(1.5/10);
		boundaryRight = boundaryLeft + canWidth*(3/10);
		boundaryBottom = boundaryTop + canWidth*(3/10);

		timerX = boundaryLeft + canWidth*(1.5/10);
		timerY = boundaryBottom + canHeight*(0.6/10);
		playerX = boundaryLeft + canWidth*(1.5/10) - playerWidth/2;
		playerY = boundaryTop + canHeight*(1.5/10);
		doorX = boundaryLeft + canWidth*(1.5/10) - doorWidth/2;
		doorY = boundaryTop + canHeight*(0.1/10);
		keyX = boundaryLeft + canWidth*(1.5/10) - keyWidth/2;
		keyY = boundaryBottom - canHeight*(0.7/10);

		objectLocations["11Rect"] = {
			type: "square",
			x: boundaryLeft,
			y: boundaryTop,
			w: canWidth*(1/10),
			h: canWidth*(1/10),
		};
		objectLocations["12Rect"] = {
			type: "square",
			x: boundaryRight - canWidth*(1/10),
			y: boundaryTop,
			w: canWidth*(1/10),
			h: canWidth*(1/10),
		};
		objectLocations["13Rect"] = {
			type: "square",
			x: boundaryLeft,
			y: boundaryBottom - canWidth*(1/10),
			w: canWidth*(1/10),
			h: canWidth*(1/10),
		};
		objectLocations["14Rect"] = {
			type: "square",
			x: boundaryRight - canWidth*(1/10),
			y: boundaryBottom - canWidth*(1/10),
			w: canWidth*(1/10),
			h: canWidth*(1/10),
		};
	} else if (level === 1) {
		levelState = 1;
		travelledPath[levelState] = [];
		levelTime = 5400;

		boundaryLeft = canWidth*(3/10) + canWidth*(0.5/10);
		boundaryTop = canHeight*(5/10) - canWidth*(1.5/10);
		boundaryRight = boundaryLeft + canWidth*(3/10);
		boundaryBottom = boundaryTop + canWidth*(3/10);

		timerX = boundaryLeft + canWidth*(1.5/10);
		timerY = boundaryBottom + canHeight*(0.6/10);
		playerX = boundaryLeft + canWidth*(1.5/10) - playerWidth/2;
		playerY = boundaryBottom - canHeight*(2/10);
		doorX = boundaryLeft + canWidth*(1.5/10) - doorWidth/2;
		doorY = boundaryBottom - canHeight*(1.2/10);
		keyX = boundaryLeft + canWidth*(1.5/10) - keyWidth/2;
		keyY = boundaryTop + canWidth*(0.5/10);

		objectLocations["21Rect"] = {
			type: "square",
			x: boundaryLeft,
			y: boundaryBottom - canWidth*(0.5/10),
			w: canWidth*(0.8/10),
			h: canWidth*(0.5/10),
		}
		objectLocations["22Rect"] = {
			type: "square",
			x: boundaryRight - canWidth*(0.8/10),
			y: boundaryBottom - canWidth*(0.5/10),
			w: canWidth*(0.8/10),
			h: canWidth*(0.5/10),
		}
		objectLocations["23Rect"] = {
			type: "square",
			x: boundaryLeft + canWidth*(0.5/10),
			y: boundaryTop + canWidth*(0.75/10) + 10,
			w: canWidth*(2/10),
			h: canHeight*(0.5/10),
		}
		objectLocations["24Rect"] = {
			type: "square",
			x: boundaryLeft + canWidth*(0.5/10),
			y: boundaryTop + canWidth*(0.75/10) - canHeight*(0.8/10) + 11,
			w: canWidth*(0.5/10),
			h: canHeight*(0.8/10),
		}
		objectLocations["25Rect"] = {
			type: "square",
			x: boundaryLeft + canWidth*(2/10),
			y: boundaryTop + canWidth*(0.75/10) - canHeight*(0.8/10) + 11,
			w: canWidth*(0.5/10),
			h: canHeight*(0.8/10),
		}
	} else if (level === 2) {
		levelState = 2;
		travelledPath[levelState] = [];
		levelTime = 5700;

		boundaryLeft = canWidth*(6/10) + canWidth*(0.7/10);
		boundaryTop = canHeight*(5/10) - canWidth*(1.5/10);
		boundaryRight = boundaryLeft + canWidth*(3/10);
		boundaryBottom = boundaryTop + canWidth*(3/10);

		timerX = boundaryLeft + canWidth*(1.5/10);
		timerY = boundaryBottom + canHeight*(0.6/10);
		playerX = boundaryLeft + canWidth*(0.3/10) - playerWidth/2;
		playerY = boundaryTop + canHeight*(0.5/10) + (doorHeight-playerHeight)/2;
		doorX = boundaryLeft + canWidth*(2.7/10) - doorWidth/2;
		doorY = boundaryTop + canHeight*(0.5/10);
		keyX = boundaryLeft + canWidth*(1.5/10) - keyWidth/2;
		keyY = boundaryBottom - canWidth*(0.45/10);

		objectLocations["31Rect"] = {
			type: "square",
			x: boundaryLeft + canWidth*(0.6/10),
			y: boundaryTop + canWidth*(0.5/10) + canHeight*(0.5/10),
			w: canWidth*(1.8/10),
			h: canWidth*(2/10) - canHeight*(0.5/10) - canWidth*(0.1/10),
		}
	}

	levelTimer = setTimeout(() => initializeMain(levelState), levelTime);
	$("canvas").fadeIn();
}

function initializeFinalScreen(ctx) {
	ctx.clearRect(0, 0, winWidth*(8/10), winHeight*(8/10));
	objectLocations = {};
	gameState = 3;
	elapsedLoops = 0;
	levelState = 0;
}