// translated from c#
// ref: http://www.cnblogs.com/gaochundong/p/design_pattern_proxy.html

namespace ProxyPattern.VirtualProxy.Impl1 {

    abstract class Subject {
        abstract get name(): string
        abstract request()
    }

    class ConcreteSubject extends Subject {
        private _name: string

        constructor(name: string) {
            super()
            this._name = name
        }

        get name(): string {
            return this._name
        }

        request() {
            console.log("do something")
        }
    }

    class Proxy extends Subject {
        private realSubject: Subject
        private _name: string

        constructor(name: string) {
            super()
            this._name = name
        }

        get name(): string {
            return this._name
        }

        request() {
            if (this.realSubject == undefined) {
                this.loadRealSubject()
            }

            this.realSubject.request()
        }

        loadRealSubject() {
            console.log("do some heavy things")

            // NOTE: create on demand
            this.realSubject = new ConcreteSubject(this._name)
        }
    }

    export function demo() {
        const subject: Subject = new Proxy("SubjectName")
        console.log(`subject name: ${subject.name}`)

        for (let i = 1; i <= 3; i++) {
            console.log()
            console.log(`${i}: `)

            subject.request()
        }
    }
}


ProxyPattern.VirtualProxy.Impl1.demo()