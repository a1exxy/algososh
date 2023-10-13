// Последовательность Фибоначчи

import {deepCopy} from "../../utils";

const min = 1
const max = 19

// Функция получения элемента последовательности Фибоначчи
//  Входящие параметры:
//  num: номер элемента последовательности
//  traceData: массив хранения слепков состояний последовательности
//  return: запрошенный элемент последовательности

// Значения оригинальной функции:
//  n    …	−10	−9	−8	−7	−6	−5	−4	−3	−2	−1	0	1	2	3	4	5	6	7	  8	  9 	10	…
// F_{n} …	−55	34	−21	13	−8	 5	−3	 2	−1	 1	0	1	1	2	3	5	8	13	21	34	55	…
const fibonacci = (num: number, traceData: Array<Array<number>>): number => {
	console.log('RUN fibonacci')
	if (num >= min && num <= max) {
		let series = [0, 1];
		traceData.push([1])
		for (let i = 2; i <= num + 1; i++) {
			series.push(series[i - 1] + series[i - 2]);
			traceData.push(deepCopy(series.slice(1,)))
		}
		return series[-1] + series[-2];
	}
	return NaN
}

export {fibonacci}
