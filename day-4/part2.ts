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
			if (i + 2 < matrix.length && j + 2 < row.length) {
				const mainDiagonalSlice = [
					matrix[i][j],
					matrix[i + 1][j + 1],
					matrix[i + 2][j + 2],
				].join('');
				const antiDiagonalSlice = [
					matrix[i][j + 2],
					matrix[i + 1][j + 1],
					matrix[i + 2][j],
				].join('');

				if (
					(mainDiagonalSlice === 'MAS' || mainDiagonalSlice === 'SAM') &&
					(antiDiagonalSlice === 'MAS' || antiDiagonalSlice === 'SAM')
				) {
					count++;
				}
			}
		}
	}

	console.log(count);
});
