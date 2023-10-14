import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css"
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils";
import {DELAY_IN_MS} from "../../constants/delays";
import {Queue} from "../../algo/queue"

const queueMaxSize = 7 // Размер очереди

const defaultLoading = {
	add: false,
	del: false,
	clear: false
}

type QueueType = {
	value: string,
	state: ElementStates,
	head?: string,
	tail?: string,
}

export const QueuePage: React.FC = () => {
	const [loading, setLoading] = useState(defaultLoading)
	const [changingHead, setChangingHead] = useState(false)
	const [changingTail, setChangingTail] = useState(false)
	const [inputString, setInputString] = useState<string | null>(null)
	const [content, setContent] = useState<Array<QueueType>>([])
	const [run, setRun] = useState(false)

	const queue = useMemo(() => new Queue<string>(queueMaxSize), []);

	const genContent = (): QueueType[] => {
		const res: QueueType[] = queue.getAll().map((item) => {
			if (item) {
				return {value: item, state: ElementStates.Default}
			} else {
				return {value: '', state: ElementStates.Default}
			}
		})
		if (queue.count()) {
			res[queue.headIndex!] = {...res[queue.headIndex!], head: 'head'}
			res[queue.tailIndex!] = {...res[queue.tailIndex!], tail: 'tail'}
		}
		if (changingHead) {
			res[queue.headIndex!] = {...res[queue.headIndex!], state: ElementStates.Changing}
		}
		if (changingTail) {
			res[queue.tailIndex!] = {...res[queue.tailIndex!], state: ElementStates.Changing}
		}
		return res
	}

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputString(evt.target.value)
	};

	const push = () => {
		if (inputString) {
			try {
				queue.enqueue(inputString)
				setChangingTail(true)
				setRun(true)
			} catch (e: any) {
				console.info(e.message)
			}
			setLoading({...loading, add: true})
		}
	}

	const pop = () => {
		try {
			queue.dequeue()
			setChangingHead(true)
			setRun(true)
		} catch (e: any) {
			console.info(e.message)
		}
		setLoading({...loading, del: true})
	}

	const clear = () => {
		queue.clear()
		setRun(true)
		setLoading({...loading, clear: true})
	}

	const play = async (): Promise<void> => {
		setContent(genContent())
		await delay(DELAY_IN_MS)
		setChangingHead(false)
		setChangingTail(false)
		setContent(genContent())
		setRun(false)
		setInputString("")
		setLoading(defaultLoading)
	}

	useEffect(() => {
		play()
	}, [run])

	return (
		<SolutionLayout title="Очередь">
			<div className={styles.container}>
				<form className={styles.stringInput}>
					<Input maxLength={4} isLimitText={true} onChange={onChange} value={inputString ? inputString : ""} disabled={run}/>
					<Button text={'Добавить'} isLoader={loading.add} onClick={push} disabled={run || !inputString}/>
					<Button text={'Удалить'} isLoader={loading.del} onClick={pop} disabled={run || queue.count() === 0}/>
					<Button text={'Очистить'} isLoader={loading.clear} onClick={clear} disabled={run || queue.count() === 0}/>
				</form>
				<div className={styles.line}>
					{content?.map((item: QueueType, index: number) =>
						<Circle letter={item.value} state={item.state} index={index} key={index} head={item?.head}
						        tail={item?.tail}/>
					)}
				</div>
			</div>
		</SolutionLayout>
	);
};
