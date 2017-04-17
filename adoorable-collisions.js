function detectCollisions() {
	objectCollision();
	doorCollision();
	keyCollision();
}

function keyCollision() {
	doorSrc.src = "openDoor.png";
}

function doorCollision() {
	if (doorSrc.src === "openDoor.png") {

	} else {

	}
}

function objectCollision() {
	for (var object in objectLocations) {
		if (!objectLocations.hasOwnProperty(object)) continue;
	}
}