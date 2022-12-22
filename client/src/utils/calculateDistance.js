export const calculateDistance = ( coordinates ) => {
	// const nestCoordinates = { x : 250 , y : 250 };

	const x1 = coordinates.x;
	const y1 = coordinates.y;
	const x2 = 250;
	const y2 = 250;
	const distance = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
	return distance;
}