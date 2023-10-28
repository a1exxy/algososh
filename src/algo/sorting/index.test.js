import {sorting, TMethod} from './index'
import {ElementStates} from "../../types/element-states";
import {Direction} from "../../types/direction";

const doTArrFormat = (a, isResult=false) => a.map(i => ({item: i, state: isResult? ElementStates.Modified : ElementStates.Default}))

const inputData = [3, 7, 0, 1, 0, 2, 2]
const result = [0, 0, 1, 2, 2, 3, 7]

describe('4: Тестирование алгоритмов сортировки выбором и пузырьком. Корректно сортирует', () => {
  it('4.1: пустой массив', () => {
    const sortedArr  = sorting(doTArrFormat([]), TMethod.bubble, Direction.Ascending, [])
    expect(sortedArr).toEqual(doTArrFormat([], true))
  })
  it('4.2: массив из одного элемента', () => {
    const sortedArr  = sorting(doTArrFormat([1]), TMethod.bubble, Direction.Ascending, [])
    expect(sortedArr).toEqual(doTArrFormat([1], true))
  })
  it('4.3: массив из нескольких элементов', () => {
    const sortedArr  = sorting(doTArrFormat(inputData), TMethod.bubble, Direction.Ascending, [])
    expect(sortedArr).toEqual(doTArrFormat(result, true))
  })
})
