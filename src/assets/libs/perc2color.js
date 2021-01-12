/**
 * Returns a color for a percentage between green and red
 * https://gist.github.com/mlocati/7210513
 * @param {int} iPercentage - percentage
 */
function perc2color(iPercentage) {
	let r, g = 0;
	const b = 0;
	if(iPercentage < 50) {
		r = 255;
		g = Math.round(5.1 * iPercentage);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * iPercentage);
	}
	const h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}
export {perc2color};