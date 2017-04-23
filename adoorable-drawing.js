function movePlayer(ctx) {

	if (gameState !== 0) ctx.clearRect(0, 0, winWidth*(8/10), winHeight*(8/10));

	if (gameState === 0 && (keysPressed[37] || keysPressed[38] || keysPressed[39] || keysPressed[40])) {
		gameState = 1;
	} else if (gameState === 0 || gameState === 3) {
		return;
	}

	origPlayerX = playerX;
	origPlayerY = playerY;

	if (keysPressed[37]) playerX = playerX - 3; //left
	if (keysPressed[38]) playerY = playerY - 3; //up
	if (keysPressed[39]) playerX = playerX + 3; //right
	if (keysPressed[40]) playerY = playerY + 3; //down

	detectCollisions(ctx);

	if (xCollided && horiCollided) playerX = origPlayerX;
	if (yCollided && vertCollided) playerY = origPlayerY;

	xCollided = false;
	yCollided = false;
	horiCollided = false;
	vertCollided = false;

	playerX = Math.max(boundaryLeft, playerX);
	playerX = Math.min(boundaryRight - playerWidth, playerX);
	playerY = Math.max(boundaryTop, playerY);
	playerY = Math.min(boundaryBottom - playerHeight, playerY);

	if (gameState === 2 && (origPlayerX !== playerX || origPlayerY !== playerY) && levelState !== 3) {
		travelledPath[levelState].push([playerX + playerWidth/2, playerY + playerHeight/2]);

		if (levelState === 1 && !objectLocations["26Rect"] && objectLocations["23Rect"] && ((playerY + playerHeight + 10) < objectLocations["23Rect"].y)) {
			let x;
			if (playerX > boundaryLeft + canWidth*(1/10) + 5 && playerX + playerWidth/2 < canWidth*(5/10)) {
				x = boundaryLeft + canWidth*(0.5/10);
				objectLocations["26Rect"] = {
					type: "square",
					x,
					y: boundaryTop,
					w: canWidth*(0.5/10),
					h: canHeight*(0.8/10) + 15,
				}
			} else if (playerX + playerWidth < boundaryLeft + canWidth*(2/10) - 5 && playerX + playerWidth/2 >= canWidth*(5/10)) {
				x = boundaryLeft + canWidth*(2/10);
				objectLocations["26Rect"] = {
					type: "square",
					x,
					y: boundaryTop,
					w: canWidth*(0.5/10),
					h: canHeight*(0.8/10) + 15,
				}
			}
		}
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

function drawObjects(ctx) {
	ctx.fillStyle = "#33334d";
	for (var key in objectLocations) {
		if (!objectLocations.hasOwnProperty(key)) continue;
		const object = objectLocations[key];
		if (object.type === "square") {
			ctx.fillRect(object.x, object.y, object.w, object.h);
		}
	}
	ctx.fillStyle = "black";
	if (gameState === 2) {
		if (levelState === 0) {
			ctx.strokeRect(canWidth*(0.3/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
			ctx.fillRect(canWidth*(3/10)+canWidth*(0.3/10)+canWidth*(0.2/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
			ctx.fillRect(canWidth-canWidth*(0.3/10)-canWidth*(3/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
		} else if (levelState === 1) {
			ctx.fillRect(canWidth*(0.3/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
			ctx.strokeRect(canWidth*(3/10)+canWidth*(0.3/10)+canWidth*(0.2/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
			ctx.fillRect(canWidth-canWidth*(0.3/10)-canWidth*(3/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
		} else {
			ctx.fillRect(canWidth*(0.3/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
			ctx.fillRect(canWidth*(3/10)+canWidth*(0.3/10)+canWidth*(0.2/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
			ctx.strokeRect(canWidth-canWidth*(0.3/10)-canWidth*(3/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
		}
		if (levelState !== 3) {
			ctx.beginPath();
			ctx.arc(timerX, timerY, timerRadius, -Math.PI/2, 2*Math.PI*(elapsedLoops*(1000/60)/levelTime)-Math.PI/2, false);
		}
	} else if (gameState === 3) {
		ctx.strokeRect(canWidth*(0.3/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
		ctx.strokeRect(canWidth*(3/10)+canWidth*(0.3/10)+canWidth*(0.2/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
		ctx.strokeRect(canWidth-canWidth*(0.3/10)-canWidth*(3/10), canHeight*(5/10)-canWidth*(1.5/10), canWidth*(3/10), canWidth*(3/10));
	}
	ctx.stroke();
	if (gameState !== 3) {
		ctx.drawImage(doorSrc, doorX, doorY);
		if (!keyFound) ctx.drawImage(keySrc, keyX, keyY);
	}
}

function drawPlayerOnPath(ctx) {
	if (!travelledPath[levelState][elapsedLoops]) {
		if (levelState < 2) {
			levelState += 1;
			elapsedLoops = -1;
		} else {
			clearInterval(gameLoopInterval);
			setTimeout(() => ctx.clearRect(0, 0, winWidth*(8/10), winHeight*(8/10)), 0);
			elapsedLoops = 0;
			levelState = 0;
			gameLoopInterval = setInterval(function() { finalLoop(ctx) }, 20);
			return;
		}
	}
	ctx.clearRect(0, 0, winWidth*(8/10), winHeight*(8/10));
	const point = travelledPath[levelState][elapsedLoops];
	ctx.beginPath();
	ctx.arc(point[0], point[1], 15, 0, 2*Math.PI);
	ctx.fill();
}

function drawPath(ctx) {
	if (!travelledPath[levelState][elapsedLoops]) {
		if (levelState < 2) {
			levelState += 1;
			elapsedLoops = -1;
		} else {
			clearInterval(gameLoopInterval);
			return;
		}
	}
	const point = travelledPath[levelState][elapsedLoops];
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.strokeStyle = "red";
	ctx.arc(point[0], point[1], 5, 0, 2*Math.PI);
	ctx.fill();
}

function showFinalScreen(ctx) {
	clearTimeout(levelTimer);
	gameIsOver = true;
	levelState = 3;
	$("canvas").fadeOut(2000, function() { 
		initializeFinalScreen(ctx);
		$("canvas").fadeIn(1000, function() {
			gameLoopInterval = setInterval(function() { playerFinalLoop(ctx) }, 5);
		});
	});
}