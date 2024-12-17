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
ui._theme = uiTheme.get_theme()
let th = ui._theme

//for debugging
dbg.info("this is an information")
dbg.success("yay it works!! :D")
dbg.error("nooooo it doesn't work :(")

//creating the window
ui.create_window("<span style='color: red'>4</span>lpn's UI lib demo", ["280px","430px"])

//for the tabs
ui.create_tab_ctx(["0px", "-20px"]) //tab context
const tab1 = ui.create_tab("combat")   // -
const tab2 = ui.create_tab("movement") //  |
const tab3 = ui.create_tab("visuals")  //  |-----> tabs (replace with the tabs needed)
const tab4 = ui.create_tab("misc")     //  |
const tab5 = ui.create_tab("exploits") // -
ui.append_tab_ctx() //append tabs to window

ui.append_window() //render window to main screen

//events and stuff
tab1.addEventListener("click", () => {
    ui.unload_tab() //add this before any actions
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