// ref: https://basarat.gitbooks.io/typescript/docs/iterators.html

namespace IteratorPattern.Impl3 {
    class Component {
        constructor(public name: string) {}
    }

    class Frame implements IterableIterator<Component> {
        iter: IterableIterator<Component>

        constructor(public name: string, public components: Component[]) {
            this.iter = (function* iter() {
                for (let component of components) {
                    yield component
                }
            })()
        }

        next(value?: any): IteratorResult<Component> {
            return this.iter.next()
        }

        [Symbol.iterator](): IterableIterator<Component> {
            return this
        }
    }

    export function demo() {
        const frame = new Frame('Door', [
            new Component('top'),
            new Component('bottom'),
            new Component('left'),
            new Component('right')
        ])

        for (let component of frame) {
            console.log(component)
        }
    }
}

IteratorPattern.Impl3.demo()
