
namespace IteratorPattern.Impl1 {
    interface Iterator<T> {
        next(): T | null
        hasNext(): boolean
    }

    interface Iterable<T> {
        iterator(): Iterator<T>
    }

    class LinkedListIterator<T> implements Iterator<T> {
        current?: Node<T>

        constructor(list: LinkedList<T>) {
            this.current = list.head
        }

        hasNext(): boolean {
            return (this.current !== undefined)
        }

        next(): T | null {
            if (this.hasNext()) {
                const { data, next } = this.current as Node<T>
                this.current = next
                return data
            }
            return null
        }
    }

    class Node<T> {
        data: T
        next?: Node<T>
    }

    class LinkedList<T> implements Iterable<T> {
        head?: Node<T>
        tail?: Node<T>

        constructor(list: T[] = []) {
            if (list.length > 0) {
                let prev: Node<T> = this.head = { data: list[0] }
                for (let node of list.splice(1)) {
                    prev.next = this.tail = { data: node }
                    prev = prev.next
                }
            }
        }

        iterator(): Iterator<T> {
            return new LinkedListIterator<T>(this)
        }

        append(data: T) {
            if (this.tail !== undefined) {
                this.tail = this.tail.next = { data }
            }
            else {
                this.head = this.tail = { data }
            }
        }
    }

    export function demo() {
        const list = new LinkedList<string>(['react', 'vue', 'angular'])
        list.append('riot')
        list.append('meteor')

        const iter = list.iterator()

        while (iter.hasNext()) {
            const framework = iter.next()
            console.log(framework)
        }
    }
}

IteratorPattern.Impl1.demo()

