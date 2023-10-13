// Стек

interface IStack<T> {
	push: (item: T) => void;
	pop: () => void;
	peak: () => T | null | undefined;
	clear: () => void
}

export class Stack<T> implements IStack<T> {
	private container: (T)[] = []
	push(item: T) {
		this.container.push(item)
	}
	pop(){
		this.container.pop()
	}
	peak(){
		return this.container[this.container.length-1]
	}
	clear(){
		this.container = []
	}
}