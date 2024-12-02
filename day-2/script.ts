import fs from 'node:fs';
import readline from 'node:readline';

let safeReports = 0;

const file = readline.createInterface({
	input: fs.createReadStream('./input.txt'),
	output: process.stdout,
	terminal: false,
});

file.on('line', (line) => {
	const report = line.split(' ').map((val) => Number(val));

	if (isReportSafe(report)) {
		safeReports++;
	} else {
		for (let i = 0; i < report.length; i++) {
			const [...reportCopy] = report;
			reportCopy.splice(i, 1);

			if (isReportSafe(reportCopy)) {
				safeReports++;
				break;
			}
		}
	}
});

file.on('close', () => {
	console.log(safeReports);
});

function isReportSafe(report: number[]) {
	if (report.length < 2) return true;

	let increasing = true;
	let decreasing = true;
	let safeLevelDifference = true;

	for (let i = 1; i < report.length; i++) {
		if (report[i] <= report[i - 1]) increasing = false;
		if (report[i] >= report[i - 1]) decreasing = false;

		const levelDifference = Math.abs(report[i - 1] - report[i]);
		if (levelDifference < 1 || levelDifference > 3) {
			safeLevelDifference = false;
		}
	}

	return (increasing || decreasing) && safeLevelDifference;
}
