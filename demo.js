//delete later, testing only
let uiTheme = new UiLibTheme()
const dbg = new UiLibDebug()
const ui = new UiLib()

let prev_tab

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
    ui.unload_tab(tab1)
    const label = ui.create_label("this is tab 1", ["20px","50px"])
    prev_tab = tab1
})

tab2.addEventListener("click", () => {
    ui.unload_tab(prev_tab)
    const label = ui.create_label("this is tab 2", ["20px","50px"])
    prev_tab = tab2
})

tab3.addEventListener("click", () => {
    ui.unload_tab(prev_tab)
    const label = ui.create_label("this is tab 3", ["20px","50px"])
    prev_tab = tab3
})

tab4.addEventListener("click", () => {
    ui.unload_tab(prev_tab)
    const label = ui.create_label("this is tab 4", ["20px","50px"])
    prev_tab = tab4
})

tab5.addEventListener("click", () => {
    ui.unload_tab(prev_tab)
    const label = ui.create_label("this is tab 5", ["20px","50px"])
    prev_tab = tab5
})