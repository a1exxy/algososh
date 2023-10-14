import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {fibonacci} from "../../algo/fibonacci";

export const FibonacciPage: React.FC = () => {
	const traceData: Array<Array<number>> = []
	const [content, setContent] = useState<Array<number> | null>(null)
	const [inputNum, setInputNum] = useState<number | null>(null)
	const [running, setRunning] = useState(false)
	const play = async (): Promise<void> => {
		setRunning(true)
		for (let i = 0; i < traceData.length; i++) {
			setContent(traceData[i])
			await delay(SHORT_DELAY_IN_MS)
		}
		setRunning(false)
		setInputNum(null)
	}

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault()
		if (inputNum) {
			fibonacci(inputNum, traceData)
		}
		play()

	}

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputNum(Number(evt.target.value))
	};

	return (
		<SolutionLayout title="Последовательность Фибоначчи">
			<div className={styles.container}>
				<form className={styles.stringInput} onSubmit={handleSubmit}>
					<Input value={inputNum ? inputNum : ''} type={'number'} min={1} max={19} isLimitText={true} onChange={onChange}/>
					<Button type={'submit'} text={'Рассчитать'} isLoader={running} disabled={!inputNum}/>
				</form>
				<div className={styles.line}>
					{content?.map((item: number, index: number) =>
						<Circle letter={String(item)} key={index} index={index} />
					)}
				</div>
			</div>
		</SolutionLayout>
	);
};
