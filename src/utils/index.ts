
// Задержка для воспроизведения анимации
const delay = (ms: number) => {
	return new Promise((res) => setTimeout(res, ms));
};

// Глубокое копирование
const deepCopy = (source: any): any => JSON.parse(JSON.stringify(source))





export {delay, deepCopy, }
