import fs from 'node:fs';
import readline from 'node:readline';

const pageOrder: { [key: string]: number[] } = {};
let sumOfMiddlePages = 0;

const file = readline.createInterface({
	input: fs.createReadStream('./input.txt'),
	output: process.stdout,
	terminal: false,
});

file.on('line', (line) => {
	if (/\d{1,2}\|\d{1,2}/.test(line)) {
		const [left, right] = line.split('|');

		if (!pageOrder[left]) {
			pageOrder[left] = [Number(right)];
		} else {
			pageOrder[left].push(Number(right));
		}

		if (!pageOrder[right]) pageOrder[right] = [];
	}

	if (/(\d{1,2},)+\d{1,2}/.test(line)) {
		const splitLine = line.split(',').map((val) => Number(val));

		let isValid = true;
		outerLoop: for (let i = 0; i < splitLine.length; i++) {
			for (let j = i + 1; j < splitLine.length; j++) {
				const validOrder = pageOrder[splitLine[i]].includes(splitLine[j]);
				if (!validOrder) {
					isValid = false;
					break outerLoop;
				}
			}
		}

		if (isValid) {
			sumOfMiddlePages += splitLine[Math.floor(splitLine.length / 2)];
		}
	}
});

file.on('close', () => {
	console.log(sumOfMiddlePages);
});
