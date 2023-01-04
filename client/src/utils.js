export function pad(n) { // adds the 0 before sigle digits hours, minutes and seconds
	return n.toString().padStart(2, '0');
}