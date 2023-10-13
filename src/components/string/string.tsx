import React, {useState, ChangeEvent, FormEvent} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css'
import {Circle} from "../ui/circle/circle";
import {DELAY_IN_MS} from "../../constants/delays";
import {stringRevert} from "../../algo/string";
import type {TStrItem} from '../../algo/string'
import {delay} from "../../utils";

export const StringComponent: React.FC = () => {
	const traceData: Array<Array<TStrItem>> = []
	const [running, setRunning] = useState(false)
	const [content, setContent] = useState<Array<TStrItem>|null>(null)
	const [inputString, setInputString] = useState('')

	const play = async ():Promise<void> => {
		setRunning(true)
		for (let i = 0; i<traceData.length; i++) {
			setContent(traceData[i])
			await delay(DELAY_IN_MS)
		}
		setRunning(false)
	}

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault()
		stringRevert(inputString, traceData)
		play()
	}

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputString(evt.target.value)
	};

	return (
		<SolutionLayout title="Строка">
			<div className={styles.container}>
				<form className={styles.stringInput} onSubmit={handleSubmit}>
					<Input maxLength={11} isLimitText={true} onChange={onChange}/>
					<Button type={'submit'} text={'Развернуть'} isLoader={running}/>
				</form>
				<div className={styles.line}>
					{content?.map((item: TStrItem, index: number) =>
						<Circle letter={item.char} state={item.state} key={index}/>
					)}
				</div>
			</div>
		</SolutionLayout>
	);
};
