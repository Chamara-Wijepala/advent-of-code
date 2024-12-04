import fs from 'node:fs';
import readline from 'node:readline';

const matrix: string[][] = [];

const file = readline.createInterface({
	input: fs.createReadStream('./input.txt'),
	output: process.stdout,
	terminal: false,
});

file.on('line', (line) => {
	matrix.push(line.split(''));
});

file.on('close', () => {
	let count = 0;

	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i];

		for (let j = 0; j < row.length; j++) {
			// check horizontal slice
			if (j + 3 < row.length) {
				const horizontalSlice = row.slice(j, j + 4).join('');
				if (horizontalSlice === 'XMAS' || horizontalSlice === 'SAMX') count++;
			}

			// check vertical slice
			if (i + 4 <= matrix.length) {
				const verticalSlice = [
					matrix[i][j],
					matrix[i + 1][j],
					matrix[i + 2][j],
					matrix[i + 3][j],
				].join('');
				if (verticalSlice === 'XMAS' || verticalSlice === 'SAMX') count++;
			}

			// check main diagonal slice
			if (i + 3 < matrix.length && j + 3 < row.length) {
				const mainDiagonalSlice = [
					matrix[i][j],
					matrix[i + 1][j + 1],
					matrix[i + 2][j + 2],
					matrix[i + 3][j + 3],
				].join('');
				if (mainDiagonalSlice === 'XMAS' || mainDiagonalSlice === 'SAMX') {
					count++;
				}
			}

			// check anti-diagonal slice
			if (i + 3 < matrix.length && j + 3 < row.length) {
				const antiDiagonalSlice = [
					matrix[i][j + 3],
					matrix[i + 1][j + 2],
					matrix[i + 2][j + 1],
					matrix[i + 3][j],
				].join('');
				if (antiDiagonalSlice === 'XMAS' || antiDiagonalSlice === 'SAMX') {
					count++;
				}
			}
		}
	}

	console.log(count);
});
