import fs from 'node:fs/promises';

try {
	const data = await fs.readFile('./input.txt', { encoding: 'utf8' });
	const matches = data.match(/mul\((\d{1,3},\d{1,3})\)/g);

	if (!matches) throw new Error();

	// slice method extracts all characters within the parenthesis of 'mul(x,y)'
	const extractedMatches = matches.map((val) => val.slice(4, -1).split(','));

	const result = extractedMatches.reduce((total, current) => {
		return total + Number(current[0]) * Number(current[1]);
	}, 0);

	console.log(result);
} catch (err) {
	console.log(err);
}
