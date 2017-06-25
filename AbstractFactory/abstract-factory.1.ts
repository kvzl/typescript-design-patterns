// Implement the example via: https://medium.com/software-engineering-101/design-patterns-abstract-factory-39a22985bdbf

namespace AbstractFactoryPattern.Impl1 {

    interface Toolbar {}

    class LightToolbar implements Toolbar {
        constructor() { console.log(this.constructor.name) }
    }
    class DarkToolbar implements Toolbar {
        constructor() { console.log(this.constructor.name) }
    }

    interface Dialog {}

    class LightDialog implements Dialog {
        constructor() { console.log(this.constructor.name) }
    }
    class DarkDialog implements Dialog {
        constructor() { console.log(this.constructor.name) }
    }


    interface ThemeFactory {
        createToolbar(): Toolbar
        createDialog(): Dialog
    }

    class LightTheme implements ThemeFactory {
        createToolbar(): Toolbar {
            return new LightToolbar()
        }

        createDialog(): Dialog {
            return new LightDialog()
        }
    }

    class DarkTheme implements ThemeFactory {
        createToolbar(): Toolbar {
            return new DarkToolbar()
        }

        createDialog(): Dialog {
            return new DarkDialog()
        }
    }

    class ThemeMaker {
        private static themes = {
            light: LightTheme,
            dark: DarkTheme
        }
        static getTheme(theme: string): ThemeFactory {
            return new ThemeMaker.themes[theme]
        }
    }

    export function demo() {
        const theme = ThemeMaker.getTheme('dark')
        const toolbar = theme.createToolbar() // DarkToolbar
        const dialog = theme.createDialog()   // DarkDialog
    }
}

AbstractFactoryPattern.Impl1.demo()
