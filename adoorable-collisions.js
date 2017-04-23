function detectCollisions(ctx) { // not going to try to make collisions perfect for every case, only cases used in this game
	objectCollision();
	doorCollision(ctx);
	keyCollision();
}

function keyCollision() {
	if (collisionSquare(playerX, playerY, playerWidth, playerHeight, keyX, keyY, keyWidth, keyHeight, false)) {
		doorSrc.src = "resources/openDoor.png";
		keyFound = true;
	}
}

function doorCollision(ctx) {
	if (keyFound) {
		if (collisionSquare(playerX, playerY, playerWidth, playerHeight, doorX, doorY, doorWidth, doorHeight, false)) {
			if (gameState === 1) {
				initializeMain();
			} else if (gameState === 2 && levelState === 0) {
				initializeMain(1);
			} else if (gameState === 2 && levelState === 1) {
				initializeMain(2);
			} else if (gameState === 2 && levelState === 2) {
				showFinalScreen(ctx);
			}
		}
	} else {
		collisionSquare(playerX, playerY, playerWidth, playerHeight, doorX, doorY, doorWidth, doorHeight, true);
	}
}

function objectCollision() { // how to do smoother pathing when colliding with circle?
	for (var key in objectLocations) {
		if (!objectLocations.hasOwnProperty(key)) continue;
		const object = objectLocations[key];
		if (object.type === "square") {
			collisionSquare(playerX, playerY, playerWidth, playerHeight, object.x, object.y, object.w, object.h, true);
		}
	}
}

function collisionSquare(x1, y1, w1, h1, x2, y2, w2, h2, retain) {
	const xCollide = x1 + w1 >= x2 && x1 <= x2 + w2;
	const yCollide = y1 + h1 >= y2 && y1 <= y2 + h2;
	const horiCollide = xCollide && (origPlayerX + w1 <= x2 || origPlayerX >= x2 + w2);
	const vertCollide = yCollide && (origPlayerY + h1 <= y2 || origPlayerY >= y2 + h2);
	if (retain && xCollide & yCollide) {
		if (!xCollided) xCollided = xCollide;
		if (!yCollided) yCollided = yCollide;
		if (!horiCollided) horiCollided = horiCollide;
		if (!vertCollided && !horiCollided) vertCollided = vertCollide;
	}
	return xCollide && yCollide;
}