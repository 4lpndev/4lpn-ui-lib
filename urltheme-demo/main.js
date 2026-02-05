//classes initialization
let uiTheme = new UiLibTheme("http://127.0.0.1:3000/test_jsonload.json")
const theme = await uiTheme.get_theme()
const ui = new UiLib(theme)
const dbg = new UiLibDebug(theme)
/*
theme stuff
IMPORTANT: if you want to customize stuff, put before the "ui._theme = uiTheme.get_theme()" line
example: uiTheme._theme.gui.backgroundColor = "purple"
refere to the theme structure in docs
*/
//let th = ui._theme

//let prevTab = document.createElement("a")

//for debugging
dbg.info("this is an information")
dbg.success("yay it works!! :D")
dbg.error("nooooo it doesn't work :(")

//creating the window
ui.window("<span style='color: red'>4</span>lpn's UI lib demo", ["fit-content","430px"])

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
    const label = ui.label("this is tab 1", ["20px","50px"])
    ui.infolabel(label, "woaaaa cool label!!!")
    prevTab = tab1
})

tab2.addEventListener("click", () => {
    const label = ui.label("this is tab 2", ["20px","50px"])
    prevTab = tab2
})

tab3.addEventListener("click", () => {
    const label = ui.label("this is tab 3", ["20px","50px"])
    prevTab = tab3
})

tab4.addEventListener("click", () => {
    const label = ui.label("this is tab 4", ["20px","50px"])
    prevTab = tab4
})