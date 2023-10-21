// Сортировка массива

import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {deepCopy} from "../../utils";

export enum TMethod {
	bubble = 'bubble',
	choice = 'choice'
}

export type TArr = {
	item: number,
	state: ElementStates
}

const swap = (arr: Array<any>, i: number, j: number) => {
	const tmp = arr[i]
	arr[i] = arr[j]
	arr[j] = tmp
}

export const sorting = (arr: Array<TArr>, method: TMethod, order: Direction, traceData: Array<Array<TArr>>): Array<TArr> => {
	if (method === TMethod.choice) {
		// Сортировка выбором
		for (let i = 0; i < arr.length - 1; i++) {
			arr[i].state = ElementStates.Changing
			traceData.push(deepCopy(arr))
			for (let j = i + 1; j < arr.length; j++) {
				arr[j].state = ElementStates.Changing
				traceData.push(deepCopy(arr))
				if (order === Direction.Ascending && arr[i].item > arr[j].item) {
					swap(arr, i, j)
				}
				if (order === Direction.Descending && arr[i].item < arr[j].item) {
					swap(arr, i, j)
				}
				arr[j].state = ElementStates.Default
				traceData.push(deepCopy(arr))
			}
			arr[i].state = ElementStates.Modified
			traceData.push(deepCopy(arr))
		}
		arr[arr.length-1].state = ElementStates.Modified
		traceData.push(deepCopy(arr))
	} else {
		// Сортировка пузырком
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length - i - 1; j++) {
				arr[j].state = ElementStates.Changing
				arr[j+1].state = ElementStates.Changing
				traceData.push(deepCopy(arr))
				if (order === Direction.Ascending && arr[j].item > arr[j + 1].item) {
					swap(arr, j, j + 1)
				}
				if (order === Direction.Descending && arr[j].item < arr[j + 1].item) {
					swap(arr, j, j + 1)
				}
				arr[j].state = ElementStates.Default
				arr[j+1].state = ElementStates.Default
				traceData.push(deepCopy(arr))
			}
			arr[arr.length - i - 1].state = ElementStates.Modified
			traceData.push(deepCopy(arr))
		}
		// arr[0].state = ElementStates.Modified
		// arr[1].state = ElementStates.Modified
	}
	return arr
}