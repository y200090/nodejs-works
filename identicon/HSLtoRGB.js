module.exports = function(h, s, l) {
	let r, g, b, max, min;
	
	h %= 360;
	s /= 100;
	l /= 100;
	
	if (l < 0.5) {
		max = l + l * s;
		min = l - l * s;

	} else {
		max = l + (1 - l) * s;
		min = l - (1 - l) * s;
	}
	
	const hp = 360 / 6;
	const q = h / hp;

	if (q <= 1) {
		r = max;
		g = (h / hp) * (max - min) + min;
		b = min;

	} else if (q <= 2) {
		r = ((hp * 2 - h) / hp) * (max - min) + min;
		g = max;
		b = min;

	} else if (q <= 3) {
		r = min;
		g = max;
		b = ((h - hp * 2) / hp) * (max - min) + min;

	} else if (q <= 4) {
		r = min;
		g = ((hp * 4 - h) / hp) * (max - min) + min;
		b = max;

	} else if (q <= 5) {
		r = ((h - hp * 4) / hp) * (max - min) + min;
		g = min;
		b = max;

	} else {
		r = max;
		g = min;
		b = ((360 - h) / hp) * (max - min) + min;
	}

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
};
