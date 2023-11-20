export const choose = (array: any[]) => array[Math.floor(Math.random() * array.length)];
export const chooseWithout = (array: any[], value: any) =>
	array.filter((v) => v !== value)[Math.floor(Math.random() * (array.length - 1))];

export const isLowerCase = (string: string) =>
	string.toLowerCase() === string && string.toUpperCase() !== string;

export const isUpperCase = (string: string) => !isLowerCase(string);
