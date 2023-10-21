import React, {ChangeEvent, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";
import {Stack} from "../../algo/stack"

const defaultLoading = {
	add: false,
	del: false,
	clear: false
}

export const StackPage: React.FC = () => {
	const [loading, setLoading] = useState(defaultLoading)
	const [inputString, setInputString] = useState<string | null>(null)
	const [content, setContent] = useState<Array<string>>([])
	const [state, setState] = useState(ElementStates.Default)
	const stack = useMemo(() => new Stack<string>(), []);
	const [run, setRun] = useState(false)

	const push = () => {
		if (inputString) {
			stack.push(inputString)
			setContent(stack.getAll())
			setLoading({...loading, add: true})
			play()
		}
	}
	const pop = () => {
		stack.pop()
		setContent(stack.getAll())
		setLoading({...loading, del: true})
		play()
	}
	const clear = () => {
		setContent([])
		setLoading({...loading, clear: true})
		play()
	}
	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputString(evt.target.value)
	};
	const play = async (): Promise<void> => {
		setRun(true)
		setState(ElementStates.Changing)
		await delay(DELAY_IN_MS)
		setState(ElementStates.Default)
		setLoading(defaultLoading)
		setInputString("")
		setRun(false)
	}

	return (
		<SolutionLayout title="Стек">
			<div className={styles.container}>
				<form className={styles.stringInput}>
					<Input maxLength={4} isLimitText={true} onChange={onChange} value={inputString ? inputString : ""} disabled={run}/>
					<Button text={'Добавить'} isLoader={loading.add} onClick={push} disabled={run || !inputString}/>
					<Button text={'Удалить'} isLoader={loading.del} onClick={pop} disabled={run || content.length === 0}/>
					<Button text={'Очистить'} isLoader={loading.clear} onClick={clear} disabled={run || content.length === 0}/>
				</form>
				<div className={styles.line}>
					{content?.map((item: string, index: number) =>
						index === content.length - 1
							? <Circle letter={item} key={index} index={index} head={'top'} state={state}/>
							: <Circle letter={item} key={index} index={index}/>
					)}
				</div>
			</div>
		</SolutionLayout>
	);
};
