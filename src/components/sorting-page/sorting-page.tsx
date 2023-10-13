import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Column} from "../ui/column/column";
import styles from './sorting-page.module.css'
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {sorting, TArr, TMethod} from "../../algo/sorting";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";


// Параметры для генерации случайного массива (по заданию)
const taskMinLength = 3
const taskMaxLength = 17
const taskMinValue = 0
const taskMaxValue = 100

// Генерация массива со случайным количеством элементов со случайными значениями
const genRandomArray = (minLength: number = taskMinLength,
                        maxLength: number = taskMaxLength,
                        minValue: number = taskMinValue,
                        maxValue: number = taskMaxValue): Array<TArr> => {
	return Array.from({length: Math.floor(Math.random() * (maxLength - minLength) + minLength)},
		() => Math.floor(Math.random() * (maxValue - minValue) + minValue))
		.map(item => ({item, state: ElementStates.Default}));
}

export const SortingPage: React.FC = () => {
	let traceData: Array<Array<TArr>> = []
	const [running, setRunning] = useState<Direction | null>(null)
	const [content, setContent] = useState<Array<TArr> | null>(null)
	const [orderType, setOrderType] = useState(TMethod.choice)
	const setChoice = () => setOrderType(TMethod.choice)
	const setBubble = () => setOrderType(TMethod.bubble)
	const randomArr = () => {
		setContent(genRandomArray())
		traceData = [content!]
	}
	const play = async (): Promise<void> => {
		for (let i = 0; i < traceData.length; i++) {
			setContent(traceData[i])
			await delay(SHORT_DELAY_IN_MS)
		}
		setRunning(null)
	}

	const onAscSort = () => {
		setRunning(Direction.Ascending)
		if (content) {
			sorting(content, orderType, Direction.Ascending, traceData)
			play()
		}
	}
	const onDescSort = () => {
		setRunning(Direction.Descending)
		if (content) {
			sorting(content, orderType, Direction.Descending, traceData)
			play()
		}
	}

	return (
		<SolutionLayout title="Сортировка массива">
			<div className={styles.container}>
				<div className={styles.menu}>
					<RadioInput name={'sortType'} label={'Выбор'} onChange={setChoice} disabled={!!running}
					            checked={orderType === TMethod.choice}/>
					<RadioInput name={'sortType'} label={'Пузырёк'} onChange={setBubble} disabled={!!running}
					            checked={orderType === TMethod.bubble}/>
					<Button text={'По возрастанию'} sorting={Direction.Ascending} onClick={onAscSort}
					        isLoader={running === Direction.Ascending}/>
					<Button text={'По убыванию'} sorting={Direction.Descending} onClick={onDescSort}
					        isLoader={running === Direction.Descending}/>
					<Button text={'Новый массив'} onClick={randomArr} disabled={!!running}/>
				</div>
				<div className={styles.amimation}>
					{content?.map((item: TArr, index: number) =>
						<Column index={item.item} key={index} state={item.state}/>
					)}
				</div>
			</div>
		</SolutionLayout>
	);
};
