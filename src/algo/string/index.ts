// Разворачивание строки

import {ElementStates} from "../../types/element-states";
import {deepCopy} from "../../utils";

export type TStrItem = {
	char: string,
	state: ElementStates
}

export const stringRevert = (inString: string, traceData: Array<Array<TStrItem>>): string => {
	// Функция разворачивания строки
	//  Входные параметры:
	//  inString: исходная строка
	//  traceData: массив хранения слепков состояний разворота
	//  return: развернутая строка

	const addTrace = (item: Array<TStrItem>) => { traceData.push(deepCopy(item)) }
	const res: Array<TStrItem> = inString.split('')
		.map(item => ({char: item, state: ElementStates.Default}))
	addTrace(res)
	for (let i = 0; i < Math.floor(res.length / 2); i++) {
		res[i].state = ElementStates.Changing
		res[res.length - i - 1].state = ElementStates.Changing
		addTrace(res)
		const tmp = res[i]
		res[i] = res[res.length - i - 1]
		res[res.length - i - 1] = tmp
		res[i].state = ElementStates.Modified
		res[res.length - i - 1].state = ElementStates.Modified
		addTrace(res)
	}
	if(res.length % 2 !== 0) {
		traceData[traceData.length-1][Math.floor(res.length / 2)].state = ElementStates.Modified
	}
	return res.map(e => e.char).join('')
}