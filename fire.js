const rgb = (r, g, b) => ({ r, g, b });
const black = rgb(0, 0, 0);

const shades = [
	rgb(7, 7, 7),
	rgb(31, 7, 7),
	rgb(47, 15, 7),
	rgb(71, 15, 7),
	rgb(87, 23, 7),
	rgb(103, 31, 7),
	rgb(119, 31, 7),
	rgb(143, 39, 7),
	rgb(159, 47, 7),
	rgb(175, 63, 7),
	rgb(191, 71, 7),
	rgb(199, 71, 7),
	rgb(223, 79, 7),
	rgb(223, 87, 7),
	rgb(223, 87, 7),
	rgb(215, 95, 7),
	rgb(215, 103, 15),
	rgb(207, 111, 15),
	rgb(207, 119, 15),
	rgb(207, 127, 15),
	rgb(207, 135, 23),
	rgb(199, 135, 23),
	rgb(199, 143, 23),
	rgb(199, 151, 31),
	rgb(191, 159, 31),
	rgb(191, 159, 31),
	rgb(191, 167, 39),
	rgb(191, 167, 39),
	rgb(191, 175, 47),
	rgb(183, 175, 47),
	rgb(183, 183, 47),
	rgb(183, 183, 55),
	rgb(207, 207, 111),
	rgb(223, 223, 159),
	rgb(239, 239, 199),
	rgb(255, 255, 255),
];

const { width, height } = { width: 50, height: 50 };

const buffer = Array(height).fill(0).map(() => Array(width).fill(0))

const blit = () => {
	const canvas = document.getElementById('canv');

	canvas.getContext("2d").imageSmoothingEnabled = false;

	const image = canvas
		.getContext("2d")
		.getImageData(0, 0, width, height);

	for(let y = 0; y < height; y++) {
		for(let x = 0; x < width; x++) {
			let index = buffer[y][x];
			let pixel = shades[index] || black;

			image.data[((width * y) + x) * 4 + 0] = pixel.r;
			image.data[((width * y) + x) * 4 + 1] = pixel.g;
			image.data[((width * y) + x) * 4 + 2] = pixel.b;
			image.data[((width * y) + x) * 4 + 3] = 255;

		}
	}

	canvas.getContext("2d").putImageData(image, 0, 0);
};

const randbit = () =>
	Math.random() > 0.5 ? 1 : 0;

const fire = () => {
	for(let y = 0; y < height - 1; y++) {
		for(let x = 0; x < width; x++) {
			let next = buffer[y + 1 - randbit()][x - randbit() + randbit()];

			buffer[y][x] = Math.max(next - 1, 0);
		}
	}
};

const init = () => {
	const y = height - 1;
	for(let x = 0; x < width; x++)
		buffer[y][x] = shades.length - 1;
};

const main = () => {
	fire();
	blit();
};

init();
setInterval(main, 100);
