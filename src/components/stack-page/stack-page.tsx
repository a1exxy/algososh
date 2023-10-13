import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";




export const StackPage: React.FC = () => {
	const [running, setRunning] = useState(false)
	const [inputString, setInputString] = useState<string | null>(null)
	const [content, setContent] = useState<Array<string>>([])
	const [state, setState] = useState(ElementStates.Default)
	// setContent(stack)
	const push = () => {
		if (inputString) {
			setContent([...content, inputString])
		}
	}
	const pop = () => {
		setContent([...content].slice(0, -1))
	}
	const clear = () => {
		setContent([])
	}
	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputString(evt.target.value)
	};
	const play = async (): Promise<void> => {
		setState(ElementStates.Changing)
		setRunning(true)
		await delay(DELAY_IN_MS)
		setState(ElementStates.Default)
		setRunning(false)
	}
	useEffect(() => {
		play()
	}, [content])

	return (
		<SolutionLayout title="Стек">
			<div className={styles.container}>
				<form className={styles.stringInput}>
					<Input maxLength={4} isLimitText={true} onChange={onChange}/>
					<Button text={'Добавить'} isLoader={running} onClick={push} disabled={!inputString} />
					<Button text={'Удалить'} isLoader={running} onClick={pop} disabled={false}/>
					<Button text={'Очистить'} isLoader={running} onClick={clear} disabled={content.length === 0}/>
				</form>
				<div className={styles.line}>
					{content?.map((item: string, index: number) =>
						index === content.length - 1
							?	<Circle letter={item} key={index} index={index} head={'top'} state={state}/>
							: <Circle letter={item} key={index} index={index}/>
					)}
				</div>
			</div>
		</SolutionLayout>
	);
};
