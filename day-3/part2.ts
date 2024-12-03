import fs from 'node:fs/promises';

try {
	const data = await fs.readFile('./input.txt', { encoding: 'utf8' });
	const matches = data.match(/mul\((\d{1,3},\d{1,3})\)|do\(\)|don't\(\)/g);

	if (!matches) throw new Error();

	let isEnabled = true;
	let result = 0;

	for (let element of matches) {
		if (element === "don't()") isEnabled = false;
		if (element === 'do()') isEnabled = true;

		if (isEnabled && /mul\((\d{1,3},\d{1,3})\)/.test(element)) {
			const [val1, val2] = element.slice(4, -1).split(',');
			result += Number(val1) * Number(val2);
		}
	}

	console.log(result);
} catch (err) {
	console.log(err);
}
