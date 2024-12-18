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

- `create_tab_ctx(position)`: creates the bar separating the tabs from the rest with a given array for position
- `append_tab_ctx()`: adds the `create_tab_ctx` to the main UI
- `create_tab(tabname, dimentions)`: creates and returns a tab with the given name and dimentions
- `unload_tab(tab)`: unloads everything from selected tab (needs rework)
- `create_window(title, dimentions)`: creates the main window
- `create_colorpicker(position)`: creates and returns a color picker in the window
- `create_button(text, dimentions, position)`: creates and returns a button with the given dimentions and position
- `create_slider(min, max, position)`: creates and returns a slider that
- `create_label(text, position, backgroundColorOn, isWaterMark)`: creates and returns text (isWaterMark will make it so it's not removable) (backgroundColorOn needs to be true or false) (needs fix)
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
//classes initialization
let uiTheme = new UiLibTheme()
const dbg = new UiLibDebug()
const ui = new UiLib()
/*
theme stuff
IMPORTANT: if you want to customize stuff, put before the "ui._theme = uiTheme.get_theme()" line
example: uiTheme._theme.gui.backgroundColor = "purple"
refere to the theme structure in docs
*/
uiTheme._theme.tab_ctx.borderColor = "none"
ui._theme = uiTheme.get_theme()
let th = ui._theme

let prevTab = document.createElement("a")

//for debugging
dbg.info("this is an information")
dbg.success("yay it works!! :D")
dbg.error("nooooo it doesn't work :(")

//creating the window
ui.create_window("<span style='color: red'>4</span>lpn's UI lib demo", ["fit-content","430px"])

//for the tabs
ui.create_tab_ctx(["0px", "-20px"]) //tab context
const tab1 = ui.create_tab("aimbot", ["fit-content","fit-content"])
const tab2 = ui.create_tab("misc", ["fit-content","fit-content"])
const tab3 = ui.create_tab("visuals", ["fit-content","fit-content"])
const tab4 = ui.create_tab("movement", ["fit-content","fit-content"])
ui.append_tab_ctx() //append tabs to window

ui.append_window() //render window to main screen

//events and stuff
tab1.addEventListener("click", () => {
    ui.unload_tab(prevTab) //add this before any actions
    tab1.style.backgroundColor = th.tabs.selectedColor
    const label = ui.create_label("this is tab 1", ["20px","50px"])
    prevTab = tab1
})

tab2.addEventListener("click", () => {
    ui.unload_tab(prevTab)
    tab2.style.backgroundColor = th.tabs.selectedColor
    const label = ui.create_label("this is tab 2", ["20px","50px"])
    prevTab = tab2
})

tab3.addEventListener("click", () => {
    ui.unload_tab(prevTab)
    tab3.style.backgroundColor = th.tabs.selectedColor
    const label = ui.create_label("this is tab 3", ["20px","50px"])
    prevTab = tab3
})

tab4.addEventListener("click", () => {
    ui.unload_tab(prevTab)
    tab4.style.backgroundColor = th.tabs.selectedColor
    const label = ui.create_label("this is tab 4", ["20px","50px"])
    prevTab = tab4
})
```

if you wish to change anything to the ui (ex. bg color, font, etc...), refere to this. these are all the things that can be changed:

```json
{
            "debug": {
                "errorColor": "red",
                "successColor": "green",
                "infoColor": "#4C4CE4"
            },

            "gui": {
                "backgroundColor": "black",
                "font": "monospace",
                "textColor": "white",
                "left": "-3px",
                "top": "-20px",
                "title": "",
                "borderColor": "gray",
                "borderType": "double",
                "borderThickness": "3px",
                "borderRadius": "0px",
                "titleBorder": "double"
            },

            "tabs": {
                "backgroundColor": "black",
                "font": "monospace",
                "textColor": "white",
                "left": "-3px",
                "top": "-20px",
                "title": "",
                "borderColor": "gray",
                "borderType": "double",
                "borderThickness": "3px",
                "borderRadius": "0px",
                "selectedColor": "gray"
            },

            "tab_ctx": {
                "borderType": "double",
                "borderColor": "gray",
                "borderThickness": "3px",
                "borderRadius": "0px",
                "backgroundColor": "black",
                "font": "monospace",
                "textColor": "white"
            },

            "buttons": {
                "backgroundColor": "black",
                "font": "monospace",
                "textColor": "white",
                "borderColor": "white",
                "borderType": "double",
                "borderThickness": "2px",
                "borderRadius": "10px"
            },

            "input": {
                "backgroundColor": "black",
                "font": "monospace",
                "textColor": "white",
                "borderColor": "white",
                "borderType": "double",
                "borderThickness": "2px",
                "borderRadius": "10px"
            },

            "dropdown": {
                "backgroundColor": "black",
                "font": "monospace",
                "textColor": "white",
                "borderColor": "white",
                "borderType": "double",
                "borderThickness": "2px",
                "borderRadius": "10px"
            },

            "checkbox": {
                "backgroundColor": "black",
                "font": "monospace",
                "textColor": "white",
                "borderColor": "white",
                "borderType": "double",
                "borderThickness": "2px",
                "borderRadius": "5px",
                "toggledColor": "white"
            },

            "label": {
                "backgroundColor": "none",
                "font": "monospace",
                "textColor": "white"
            }
        }
```