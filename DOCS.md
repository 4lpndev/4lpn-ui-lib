# 4lpn's UI lib usage
before anything, note that:

- the docs need to be updated due to them being rushed
- the code is kinda bad but it works
- it's not going to be very easy when you begin in code
- suggestions are opened

---
## Classes:
there are 4 main classes. here's the functions in them:

# `class UiLibEvents`: for custom events

functions:

- `addEventListener(event, action)`: adds an event listener for a specific event
- `dispatchEvent(action, data)`: calls an event
- `removeEventListener(eventType, listener)`: removes the event

---

# `class UiLibTheme`: for ui customization

function:
- `get_theme()`: returns `this._theme` from constructor (kinda pointless i think)

---

# `class UiLib`: for everything UI related

functions:

- `create_tab_ctx()`: creates the bar separating the tabs from the rest
- `append_tab_ctx()`: adds the `create_tab_ctx` to the main UI
- `create_tab(tabname)`: creates and returns a tab with the given name
- `unload_tab)`: unloads everything from previous tab
- `create_window(title, dimentions)`: creates the main window
- `create_colorpicker(position)`: creates and returns a color picker in the window
- `create_button(text, dimentions, position)`: creates and returns a button with the given dimentions and position
- `create_slider(min, max, position)`: creates and returns a slider that
- `create_label(text, position)`: creates and returns text
- `create_input(placeholder, dimentions, position)`: creates and returns an input box
- `create_checkbox(text, position, boxdim)`: creates and returns a checkbox
- `create_dropdown(options, dimentions, position)`: creates and returns a dropdown menu
- `append_window()`: adds the window to the main site
- `delete_element(elem)`: removes an element
- `destroy_window()`: removes the whole window

---

# `class UiLibDebug`: for everything debugging related

functions:

- `error(message)`: prints an error to the console
- `success(message)`: prints something that executed successfully in the console
- `info(message)`: prints an info in the console

---

here's a little example i made to try the tabs out:

```js
let uiTheme = new UiLibTheme()
const dbg = new UiLibDebug()
const ui = new UiLib()

let toggled = false

let th = uiTheme.get_theme()

dbg.info("this is an information")
dbg.success("yay it works!! :D")
dbg.error("nooooo it doesn't work :(")

function testing() {
    dbg.success("success!!")
}

function slider_test(data) {
    dbg.info(data)
}

function input_test(data) {
    dbg.info(data)
}

ui.create_window("4lpn's UI lib demo", ["280px","430px"])

ui.create_tab_ctx()
const tab1 = ui.create_tab("combat")
const tab2 = ui.create_tab("movement")
const tab3 = ui.create_tab("visuals")
const tab4 = ui.create_tab("misc")
const tab5 = ui.create_tab("exploits")
ui.append_tab_ctx()

ui.append_window()

tab1.addEventListener("click", () => {
    ui.unload_tab()
    const label = ui.create_label("this is tab 1", ["20px","50px"])
})

tab2.addEventListener("click", () => {
    ui.unload_tab()
    const label = ui.create_label("this is tab 2", ["20px","50px"])
})

tab3.addEventListener("click", () => {
    ui.unload_tab()
    const label = ui.create_label("this is tab 3", ["20px","50px"])
})

tab4.addEventListener("click", () => {
    ui.unload_tab()
    const label = ui.create_label("this is tab 4", ["20px","50px"])
})

tab5.addEventListener("click", () => {
    ui.unload_tab()
    const label = ui.create_label("this is tab 5", ["20px","50px"])
})
```

# how to use in tampermonkey:

here's an example tampermonkey script (tried on firefox):

```js
// ==UserScript==
// @name         test lib
// @namespace    http://tampermonkey.net/
// @version      2024-12-16
// @description  i'm on dat gud kush and alkahal 🔥🗣
// @author       You
// @match        https://REPLACE-ME-WITH-A-WEBSITE!!/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @require      https://raw.githubusercontent.com/4lpndev/4lpn-ui-lib/refs/heads/main/4lpnlib.js
// ==/UserScript==

(function() {
    'use strict';

    let uiTheme = new UiLibTheme()
    const dbg = new UiLibDebug()
    const ui = new UiLib()

    let toggled = false

    let th = uiTheme.get_theme()

    dbg.info("this is an information")
    dbg.success("yay it works!! :D")
    dbg.error("nooooo it doesn't work :(")

    function testing() {
        dbg.success("success!!")
    }

    function slider_test(data) {
        dbg.info(data)
    }

    function input_test(data) {
        dbg.info(data)
    }

    ui.create_window("4lpn's UI lib demo", ["280px","430px"])

    ui.create_tab_ctx()
    const tab1 = ui.create_tab("combat")
    const tab2 = ui.create_tab("movement")
    const tab3 = ui.create_tab("visuals")
    const tab4 = ui.create_tab("misc")
    const tab5 = ui.create_tab("exploits")
    ui.append_tab_ctx()

    ui.append_window()

    tab1.addEventListener("click", () => {
        ui.unload_tab()
        const label = ui.create_label("this is tab 1", ["20px","50px"])
        })

    tab2.addEventListener("click", () => {
        ui.unload_tab()
        const label = ui.create_label("this is tab 2", ["20px","50px"])
        })

    tab3.addEventListener("click", () => {
        ui.unload_tab()
        const label = ui.create_label("this is tab 3", ["20px","50px"])
        })

    tab4.addEventListener("click", () => {
        ui.unload_tab()
        const label = ui.create_label("this is tab 4", ["20px","50px"])
        })

    tab5.addEventListener("click", () => {
        ui.unload_tab()
        const label = ui.create_label("this is tab 5", ["20px","50px"])
        })
})();
```

