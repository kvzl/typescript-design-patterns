// rewrite iterator.1.ts
// try to be compatible with javascript's iterator protocol

namespace IteratorPattern.Impl2 {
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

       [Symbol.iterator]() {
           if (this.head != undefined) {
               return (function* iter(head) {
                   let current: Node<T> | undefined = head
                   while (current != undefined) {
                       yield current.data
                       current = current.next
                   }
               })(this.head)
           }

           return (function*() {})()
       }

       append(data: T) {
           if (this.tail != undefined) {
               this.tail = this.tail.next = { data }
           }
           else {
               this.head = this.tail = { data }
           }
       }
    }

    export function demo() {
        const list = new LinkedList([ 'react', 'vue', 'angular' ])
        list.append('riot')
        list.append('meteor')

        for (let framework of list) {
            console.log(framework)
        }

        console.log('==========')
        console.log([...list].join(', '))
    }
}

IteratorPattern.Impl2.demo()

