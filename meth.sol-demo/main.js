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

uiTheme._theme.label.backgroundColor = "#3f3f3c"
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
ui.window("<img src='./logo.png'  style='position: relative; z-index:999; width: 80px; top: 2px; left: 3px'></img>", ["600px","430px"])

//for the tabs
ui.create_tab_ctx(["77px", "-114px"]) //tab context
const tab1 = ui.create_tab("aimbot", ["106px","76px"])
const tab2 = ui.create_tab("visuals", ["106px","76px"])
const tab3 = ui.create_tab("misc", ["106px","76px"])
const tab4 = ui.create_tab("config", ["106px","76px"])
ui.append_tab_ctx() //append tabs to window

const tag = ui.label("meth.sol (bad) remake by 4lpn using 4lpn's ui lib", ["120px","220px"], true, true)

ui.append_window() //render window to main screen

//events and stuff
tab1.addEventListener("click", () => {
    ui.unload_tab(prevTab) //add this before any actions
    tab1.style.backgroundColor = th.tabs.selectedColor
    const label = ui.label("this is tab 1", ["-140px","50px"], false, false)
    prevTab = tab1
})

tab2.addEventListener("click", () => {
    ui.unload_tab(prevTab)
    tab2.style.backgroundColor = th.tabs.selectedColor
    const label = ui.label("this is tab 2", ["-140px","50px"], false, false)
    prevTab = tab2
})

tab3.addEventListener("click", () => {
    ui.unload_tab(prevTab)
    tab3.style.backgroundColor = th.tabs.selectedColor
    const label = ui.label("this is tab 3", ["-140px","50px"], false, false)
    prevTab = tab3
})

tab4.addEventListener("click", () => {
    ui.unload_tab(prevTab)
    tab4.style.backgroundColor = th.tabs.selectedColor
    const label = ui.label("this is tab 4", ["-140px","50px"], false, false)
    prevTab = tab4
})