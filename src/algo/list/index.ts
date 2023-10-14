// Связный список

// Класс элемент списка
export class Node<T> {
	value: T;
	next: Node<T> | null = null;

	constructor(value: T, next?: Node<T> | null) {
		this.value = value;
		this.next = (next === undefined ? null : next);
	}
}

// Класс списка
export class LinkedList<T> {
	private head: Node<T> | null = null; // ссылка на головной элемент списка
	private tail: Node<T> | null = null; // ссылка на хвостовой элемент списка
	private size: number = 0;            // количество элементов списка

	constructor(init: Array<T> = []) {
		for(let i=0; i<init.length; i++){
			this.append(init[i])
		}
	}

	getAll() {
		let res: Array<Node<T>> = []
		let tmp = this.head
		for (let i = 0; i < this.size; i++) {
			res.push(tmp!)
			tmp = tmp!.next
		}
		return res
	}

	dump() {
		console.log(`----------`)
		console.log('LinkedList DUMP:')
		console.log(`size: ${this.size}`)
		let tmp = this.head
		for (let i = 0; i < this.size; i++) {
			console.log(`${tmp?.value}`)
			tmp = tmp?.next!
		}
		console.log(`----------`)
	}

	// Получение элемента по списку
	getElem(index: number) {
		let n: Node<T> | null = this.head
		for (let i = 0; i < index; i++) {
			n = n?.next!
		}
		return n
	}

	// Добавление в конец списка
	append(elem: T) {
		this.insert(this.size, elem)
	}

	pop() {
		this.delete(this.size - 1)
	}

	// Получение размера списка
	getSize() {
		return this.size
	}


	// Вставка по индексу
	insert(index: number, elem: T) {
		// console.log(`[RUN insert] index: ${index}; elem: ${elem}`)
		// console.log('!!!pre dump:')
		// this.dump()
		if (index < 0 || index > this.size) {
			throw Error('Не корректный индекс')
		}
		const node = new Node(elem)
		if (this.head === null) {
			// console.log(1)
			this.head = node
			this.tail = node
		} else if (index === 0) {
			// console.log(2)
			node.next = this.head
			this.head = node
		} else if (index === this.size) {
			// console.log(3)
			this.tail!.next = node
			this.tail = node
		} else {
			// console.log(4)
			const item = this.getElem(index - 1)!
			const tmp = item.next
			item.next = node
			node.next = tmp
		}
		this.size++
		// console.log('!!!post dump:')
		// this.dump()
	}

	// удаление элемента списка по индексу
	delete(index: number) {
		// console.log(`[RUN delete] index: ${index}`)
		// console.log('!!!pre dump:')
		// this.dump()
		if (this.head === null) {
			throw Error('Список пуст')
		}
		if (index < 0 || index > this.size - 1) {
			throw Error('Не корректный индекс')
		}
		if (this.size === 1) {
			// console.log(1)
			this.head = null
			this.tail = null
		} else if (index === 0) {
			// console.log(2)
			this.head = this.head.next
		} else {
			// console.log(3)
			const item = this.getElem(index - 1)!
			// console.log(`item: ${item.value}`)
			if (item.next?.next) {
				// console.log(4)
				item.next = item.next.next
			} else {
				// console.log(5)
				item.next = null
				this.tail = item
			}
		}
		this.size--
		// console.log('!!!post dump:')
		// this.dump()
	}

}

