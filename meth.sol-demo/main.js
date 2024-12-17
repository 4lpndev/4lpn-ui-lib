//classes initialization
let uiTheme = new UiLibTheme()
const dbg = new UiLibDebug()
const ui = new UiLib()

let prevTab = document.createElement("a")
/*
theme stuff
IMPORTANT: if you want to customize stuff, put before the "ui._theme = uiTheme.get_theme()" line
example: uiTheme._theme.gui.backgroundColor = "purple"
refere to the theme structure in docs
*/

uiTheme._theme.gui.titleBorder = "none"
uiTheme._theme.tab_ctx.borderColor = "none"
uiTheme._theme.tabs.borderType = "none"
uiTheme._theme.gui.borderType = "none"
uiTheme._theme.tabs.backgroundColor = "#3f3f3c"
uiTheme._theme.gui.backgroundColor = "#262625"
ui._theme = uiTheme.get_theme()
const th = ui._theme

//for debugging
dbg.info("this is an information")
dbg.success("yay it works!! :D")
dbg.error("nooooo it doesn't work :(")

//creating the window
ui.create_window("<img src='./logo.png'  style='position: relative; z-index:999; width: 80px; top: 1px;'></img>", ["500px","430px"])

//for the tabs
ui.create_tab_ctx(["77px", "-100px"]) //tab context
const tab1 = ui.create_tab("aimbot", ["106px","60px"])   // -
const tab2 = ui.create_tab("visuals", ["106px","60px"]) //  |
const tab3 = ui.create_tab("misc", ["106px","60px"])  //  |-----> tabs (replace with the tabs needed)
const tab4 = ui.create_tab("config", ["106px","60px"])     //  |

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