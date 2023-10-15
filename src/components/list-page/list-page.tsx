import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {LinkedList} from "../../algo/list";
import {deepCopy, delay} from "../../utils";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";

type listItemType = {
	headMark?: boolean,
	tailMark?: boolean,
	value: string,
	headString?: string
	tailString?: string,
	state?: ElementStates
}

const firstElementsCount = 5 // кол-во начальных элементов

const generateRandomArray = (): Array<string> => {
	return Math.floor(Math.random() * Date.now()).toString(36).split('').slice(0, firstElementsCount);
};

const defaultLoading = {
	addHead: false,
	addTail: false,
	delHead: false,
	delTail: false,
	addIndex: false,
	delIndex: false
}

export const ListPage: React.FC = () => {
	let traceData: Array<Array<listItemType>> = []
	const [loading, setLoading] = useState(defaultLoading)
	const [inputValue, setInputValue] = useState<string | null>(null)
	const [inputIndex, setInputIndex] = useState<number | null>(null)
	const [run, setRun] = useState(false)
	const [content, setContent] = useState<Array<listItemType>>([])
	const list = useMemo(() => new LinkedList<string>(generateRandomArray()), []);
	const [max, setMax] = useState(firstElementsCount - 1)

	useEffect(() => {
		setMax(list.getSize() - 1)
	}, [run]);

	const onChangeValue = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputValue(evt.target.value)
	}
	const onChangeIndex = (evt: ChangeEvent<HTMLInputElement>) => {
		if (!evt.target.value) {
			setInputIndex(null)
		} else {
			setInputIndex(Number(evt.target.value))
		}
	}

	const genContent = () => {
		setContent(list.getAll().map((item) => {
			return ({value: item.value})
		}))
	}

	const listElem = ({headMark, tailMark, value, headString, tailString, state}: listItemType, index: number) => {
		const head = headString
			? <Circle state={ElementStates.Changing} isSmall={true} letter={headString} extraClass={styles.headCircle}/>
			: headMark
				? 'head'
				: ""
		const tail = tailString
			? <Circle state={ElementStates.Changing} isSmall={true} letter={tailString} extraClass={styles.headCircle}/>
			: tailMark
				? 'tail'
				: ""
		return (
			<Circle letter={value} head={head} tail={tail} state={state} index={index}/>
		)
	}

	const checkValue = () => {
		if (inputValue === null || inputValue === "") {
			return false
		}
		return true
	}

	const onAddHead = () => {
		if (inputValue) {
			traceData.push(getValue())
			traceData.push(getValue())
			traceData[1][0] = {...traceData[1][0], headString: inputValue}
			list.insert(0, inputValue!)
			traceData.push(getValue())
			traceData[2][0] = {...traceData[2][0], state: ElementStates.Modified}
			traceData.push(getValue())
			setRun(true)
			setLoading({...loading, addHead: true})
			play()
		}
	}

	const getValue = () => {
		return deepCopy(list.getAll().map((item) => ({value: item.value})))
	}

	const onAddTail = () => {
		if (checkValue()) {
			traceData.push(getValue()) //0
			traceData.push(getValue()) //1
			traceData[1][traceData[1].length - 1] = {...traceData[1][traceData[1].length - 1], headString: inputValue!}
			list.append(inputValue!)
			traceData.push(getValue()) //2
			traceData[2][traceData[2].length - 1] = {...traceData[2][traceData[2].length - 1], state: ElementStates.Modified}
			traceData.push(getValue()) //3
			setRun(true)
			setLoading({...loading, addTail: true})
			play()
		}
	}

	const onDelHead = () => {
		traceData.push(getValue())
		traceData.push(getValue())
		traceData[1][0] = {...traceData[1][0], value: "", tailString: traceData[1][0].value}
		list.delete(0)
		traceData.push(getValue())
		setRun(true)
		setLoading({...loading, delHead: true})
		play()
	}

	const onDelTail = () => {
		traceData.push(getValue())
		traceData.push(getValue())
		traceData[1][traceData[1].length - 1] = {
			...traceData[1][traceData[1].length - 1],
			value: "",
			tailString: traceData[1][traceData[1].length - 1].value
		}
		list.pop()
		traceData.push(getValue())
		setRun(true)
		setLoading({...loading, delTail: true})
		play()
	}

	const last = () => traceData[traceData.length - 1] // функция возврата последнего элемента трейса

	const checkIndex = () => {
		if ((inputIndex || inputIndex == 0) && inputIndex <= list.getSize()) return true
		return false
	}

	const onAddIndex = () => {
		if (checkValue() && checkIndex()) {
			traceData.push(getValue())
			for (let i = 0; i <= inputIndex!; i++) {
				traceData.push(getValue())
				last()[i] = {...last()[i], headString: inputValue!}
				for (let j = 0; j < i; j++) {
					last()[j] = {...last()[j], state: ElementStates.Modified}
				}
			}
			list.insert(inputIndex!, inputValue!)
			traceData.push(getValue())
			setRun(true)
			setLoading({...loading, addIndex: true})
			play()
		}
	}

	const onDelIndex = () => {
		if (checkIndex()) {
			traceData.push(getValue())
			for (let i = 0; i <= inputIndex!; i++) {
				traceData.push(getValue())
				for (let j = 0; j < i; j++) {
					last()[j] = {...last()[j], state: ElementStates.Modified}
				}
			}
			traceData.push(getValue())
			last()[inputIndex!] = {...last()[inputIndex!], value: "", tailString: last()[inputIndex!].value}
			list.delete(inputIndex!)
			traceData.push(getValue())
			setRun(true)
			setLoading({...loading, delIndex: true})
			play()
		}
	}

	const play = async (): Promise<void> => {
		for (let i = 0; i < traceData.length; i++) {
			setContent(traceData[i])
			await delay(SHORT_DELAY_IN_MS) // 500мс
			// await delay(DELAY_IN_MS)    // 1c
		}
		setRun(false)
		traceData = []
		setInputIndex(null)
		setInputValue(null)
		setLoading(defaultLoading)
	}

	useEffect(() => {
		genContent()
	}, [])

	return (
		<SolutionLayout title="Связный список">
			<div className={styles.container}>
				<form className={styles.header}>
					<div className={styles.headerString}>
						<Input maxLength={4} isLimitText={true} onChange={onChangeValue} extraClass={styles.inputElem}
						       value={inputValue ? inputValue : ""} disabled={run}/>
						<Button isLoader={loading.addHead} text={'Добавить в head'} onClick={onAddHead}
						        disabled={!inputValue?.length || run}/>
						<Button isLoader={loading.addTail} text={'Добавить в tail'} onClick={onAddTail}
						        disabled={!inputValue?.length || run}/>
						<Button isLoader={loading.delHead} text={'Удалить из head'} onClick={onDelHead}
						        disabled={!(list.getSize() > 0) || run}/>
						<Button isLoader={loading.delTail} text={'Удалить из tail'} onClick={onDelTail}
						        disabled={!(list.getSize() > 0) || run}/>
					</div>
					<div className={`${styles.headerString} ${styles.headerStringheaderString}`}>
						<Input
							type="number"
							min={0}
							max={max}
							placeholder={'Введите индекс'}
							onChange={onChangeIndex}
							extraClass={styles.inputElem}
							value={inputIndex || inputIndex == 0 ? inputIndex : ''}
							disabled={run}
						/>
						<Button
							isLoader={loading.addIndex}
							text={'Добавить по индексу'}
							onClick={onAddIndex}
							extraClass={`${styles.button}`}
							disabled={!(inputValue?.length && (inputIndex || inputIndex == 0) && (list.getSize() > 0 && inputIndex < list.getSize() && inputIndex >= 0) ) || run}
						/>
						<Button
							isLoader={loading.delIndex}
							text={'Удалить по индексу'}
							onClick={onDelIndex}
							extraClass={styles.button}
							disabled={!((inputIndex || inputIndex == 0) && list.getSize() > 0) || run}
						/>
					</div>
				</form>
				<div className={styles.line}>
					{content?.map((item: listItemType, index: number) => {
							const arrow = content.length > 1 && index < content.length - 1
								? <div className={styles.arrow}><ArrowIcon/></div> : ""
							return (
								<div key={index} className={styles.lineBlock}>
									{listElem(
										{
											...item,
											headMark: index === 0,
											tailMark: index === content.length - 1
										},
										index)}
									{arrow}
								</div>
							)
						}
					)}
				</div>
			</div>
		</SolutionLayout>
	);
};
