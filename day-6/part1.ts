import fs from 'node:fs/promises';

let direction = 'north' as 'north' | 'east' | 'south' | 'west';

try {
	const data = await fs.readFile('./input.txt', { encoding: 'utf8' });
	const lineLength = data.indexOf('\n');
	const guardArea = data.split('');

	let isGuardInArea = true;
	while (isGuardInArea) {
		let currentPos = guardArea.indexOf('^');
		let nextPos: number;

		switch (direction) {
			case 'north':
				// lineLength + 1 accounts for a newline character
				nextPos = currentPos - (lineLength + 1);
				// guard leaves area
				if (nextPos < 0) {
					guardArea[currentPos] = 'X';
					isGuardInArea = false;
					break;
				}
				// guard hits obstacle
				if (guardArea[nextPos] === '#') {
					direction = 'east';
					break;
				}
				// move guard
				guardArea[nextPos] = '^';
				guardArea[currentPos] = 'X';
				break;
			case 'east':
				nextPos = currentPos + 1;
				if (guardArea[nextPos] === '\n') {
					guardArea[currentPos] = 'X';
					isGuardInArea = false;
					break;
				}
				if (guardArea[nextPos] === '#') {
					direction = 'south';
					break;
				}
				guardArea[nextPos] = '^';
				guardArea[currentPos] = 'X';
				break;
			case 'south':
				nextPos = currentPos + (lineLength + 1);
				// -1 accounts for the last newline character
				if (nextPos > guardArea.length - 1) {
					guardArea[currentPos] = 'X';
					isGuardInArea = false;
					break;
				}
				if (guardArea[nextPos] === '#') {
					direction = 'west';
					break;
				}
				guardArea[nextPos] = '^';
				guardArea[currentPos] = 'X';
				break;
			case 'west':
				nextPos = currentPos - 1;
				if (nextPos < 0 || guardArea[nextPos] === '\n') {
					guardArea[currentPos] = 'X';
					isGuardInArea = false;
					break;
				}
				if (guardArea[nextPos] === '#') {
					direction = 'north';
					break;
				}
				guardArea[nextPos] = '^';
				guardArea[currentPos] = 'X';
				break;
			default:
				break;
		}
	}

	const distinctPositions = guardArea.reduce((total, current) => {
		if (current === 'X') total++;
		return total;
	}, 0);

	console.log(distinctPositions);
} catch (err) {
	console.log(err);
}
