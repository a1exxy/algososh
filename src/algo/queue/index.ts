// Очередь

interface IQueue<T> {
	headIndex: number | null;
	tailIndex: number | null;
	enqueue: (item: T) => IQueue<T>;
	dequeue: () => IQueue<T>;
	peak: () => T | null;
	clear: () => IQueue<T>;
	getAll: () => (T | null)[];
	getSize: () => number;
	count: () => number;
}

export class Queue<T> implements IQueue<T> {
	private readonly queueSize: number;
	private container: (T | null)[] = []
	headIndex: number | null = null
	tailIndex: number | null = null

	constructor(queueSize: number) {
		if (queueSize < 1) {
			throw new Error(`Некорректное значение длинны очереди`)
		}
		this.queueSize = queueSize
		this.container = Array(queueSize).fill(null)
	}

	getSize() {
		return this.queueSize
	}

	count() {
		return this.container.reduce((sum: number, current: T | null) => current ? sum + 1 : sum, 0)
	}

	enqueue(item: T) {
		// console.log(this)
		if (!this.tailIndex || this.tailIndex < this.queueSize - 1) {
			if (this.tailIndex || this.tailIndex === 0) {
				this.tailIndex = this.tailIndex + 1
			} else {
				this.tailIndex = 0
				this.headIndex = 0
			}
			this.container[this.tailIndex] = item
		} else {
			throw new Error('Превышение размера очереди')
		}
		return this
	}

	dequeue() {
		if (this.count() > 0) {
			this.container[this.headIndex!] = null
			this.headIndex = this.headIndex! + 1
		} else {
			throw new Error(`Очередь пуста`)
		}
		return this
	}

	peak() {
		if (this.count() > 0) {
			return this.container[-1]
		} else return null
	}

	clear() {
		this.container = Array(this.queueSize).fill(null)
		this.headIndex = null
		this.tailIndex = null
		return this
	}

	getAll() {
		return this.container
	}
}

