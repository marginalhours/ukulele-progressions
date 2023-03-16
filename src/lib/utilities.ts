export const choose = (array: any[]) => array[Math.floor(Math.random() * array.length)];

export const isLowerCase = (string: string) =>
	string.toLowerCase() === string && string.toUpperCase() !== string;

export const isUpperCase = (string: string) => !isLowerCase(string);
