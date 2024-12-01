import fs from 'node:fs';
import readline from 'node:readline';

const leftList: number[] = [];
const rightList: number[] = [];

const file = readline.createInterface({
	input: fs.createReadStream('./input.txt'),
	output: process.stdout,
	terminal: false,
});

file.on('line', (line) => {
	const [left, right] = line.split(/\s+/);
	leftList.push(Number(left));
	rightList.push(Number(right));
});

file.on('close', () => {
	leftList.sort((a, b) => a - b);
	rightList.sort((a, b) => a - b);

	const totalDistance = calculateTotalDistance(leftList, rightList);
	const similarityScore = calculateSimilarityScore(leftList, rightList);

	console.log('Total Distance: ', totalDistance);
	console.log('Similarity Score: ', similarityScore);
});

function calculateTotalDistance(leftList: number[], rightList: number[]) {
	let val = 0;

	for (let i = 0; i < leftList.length; i++) {
		val += Math.abs(leftList[i] - rightList[i]);
	}

	return val;
}

function calculateSimilarityScore(leftList: number[], rightList: number[]) {
	let val = 0;

	for (let i = 0; i < leftList.length; i++) {
		let currentLeftVal = leftList[i];
		let multiplier = 0;

		for (let j = 0; j < rightList.length; j++) {
			if (rightList[j] === currentLeftVal) multiplier++;
		}

		val += currentLeftVal * multiplier;
	}

	return val;
}
