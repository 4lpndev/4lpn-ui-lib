function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.className === "cb") {
            ;
        } else {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

class UiLibEvents {
    constructor() {
        this.listeners = {};
    }

    addEventListener(eventType, listener) {
        if (!this.listeners[eventType]) {
            this.listeners[eventType] = [];
        }
        this.listeners[eventType].push(listener);
    }

    dispatchEvent(eventType, eventData) {
        if (this.listeners[eventType]) {
            this.listeners[eventType].forEach(listener => {
                listener(eventData);
            });
        }
    }

    removeEventListener(eventType, listener) {
        if (this.listeners[eventType]) {
            const index = this.listeners[eventType].indexOf(listener);
            if (index !== -1) {
                this.listeners[eventType].splice(index, 1);
            }
        }
    }
}

const events = new UiLibEvents();


class UiLibTheme {
    constructor() {
        this._mainColor = "#4C4CE4";

        this._theme = {
            "debug": {
                "errorColor": "red",
                "successColor": "green",
                "infoColor": this._mainColor
            },

            "gui": {
                "globalColor": this._mainColor,
                "backgroundColor": "black",
                "font": "monospace",
                "textColor": "white",
                "left": "-3px",
                "top": "-20px",
                "title": "",
                "borderColor": "gray",
                "borderType": "double",
                "borderThickness": "3px",
                "borderRadius": "0px"
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
            }
        };
    }

    get_theme() {
        return this._theme;
    }
}

class UiLib {
    constructor() {
        this._mainWindow = null;
        this._theme = new UiLibTheme().get_theme();
        this._tabs = []
        this._tabctx = null
        this._elements = []
        this._currentTab = null
        this._events = events
        this._guiBind = "ShiftRight"
        this._guiHidden = false
    }

    create_tab_ctx() {
    const tabappend = document.createElement("div")
        tabappend.style.width = "auto"
        this._tabctx = tabappend
    }

    append_tab_ctx() {
        const tab_ctx = document.createElement("div")
        tab_ctx.style.width = "auto"

        tab_ctx.style.border = `${this._theme.gui.borderThickness} ${this._theme.gui.borderType} ${this._theme.gui.borderColor}`

        this._tabctx.appendChild(tab_ctx)
        this._mainWindow.appendChild(this._tabctx)
    }

    create_tab(tabname) {
        const tab = document.createElement("div")
        tab.innerText = tabname
        tab.style.border = `${this._theme.gui.borderThickness} ${this._theme.gui.borderType} ${this._theme.gui.borderColor}`
        tab.style.backgroundColor = this._theme.gui.backgroundColor
        tab.style.position = "relative"
        tab.style.display = "inline-block"
        tab.style.color = this._theme.gui.textColor
        tab.style.fontFamily = this._theme.gui.font
        tab.style.width = "fit-content"
        tab.style.height = "fit-content"

        this._tabctx.appendChild(tab)

        this._tabs.push(tab)

        return tab
    }

    unload_tab(tabObj) {
        this._elements.forEach(elem => {
            elem.remove()
        })
    }

    create_window(title, dimentions) {
        const winTitle = document.createElement("h4");
        winTitle.style.position = "relative"
        winTitle.style.color = this._theme.gui.textColor;
        winTitle.style.left = this._theme.gui.left;
        winTitle.style.top = this._theme.gui.top;
        winTitle.style.width = "fit-content"
        winTitle.style.border = `${this._theme.gui.borderThickness} ${this._theme.gui.borderType} ${this._theme.gui.borderColor}`
        winTitle.style.fontFamily = this._theme.gui.font;
        winTitle.innerText = title;

        this._mainWindow = document.createElement("div");
        this._mainWindow.style.zIndex = 999999;
        this._mainWindow.style.position = "absolute";
        this._mainWindow.style.width = `${dimentions[0]}`;
        this._mainWindow.style.height = `${dimentions[1]}`;
        this._mainWindow.style.border = `${this._theme.gui.borderThickness} ${this._theme.gui.borderType} ${this._theme.gui.borderColor}`;
        this._mainWindow.style.borderRadius = this._theme.gui.borderRadius
        this._mainWindow.style.backgroundColor = this._theme.gui.backgroundColor;


        document.body.addEventListener("keydown", (e) => {
            if (e.code == this._guiBind) {
                this._guiHidden = !this._guiHidden
                if (this._guiHidden) {
                    this._mainWindow.style.display = "none"
                } else {
                    this._mainWindow.style.display = "block"
                }
            }
        })

        this._mainWindow.appendChild(winTitle);
    }

    update_window() {
        const th = this._theme;
        this._mainWindow.style.backgroundColor = th._theme.gui.backgroundColor;
    }

    create_colorpicker(position) {
        const cpicker = document.createElement("input")
        cpicker.type = "color"
        cpicker.style.position = "relative"
        cpicker.style.left = position[0]
        cpicker.style.top = position[1]

        this._mainWindow.appendChild(cpicker)

        this._elements.push(cpicker)

        return cpicker
    }

    create_button(text, dimentions, position) {
        const btn = document.createElement("button");
        btn.style.fontFamily = this._theme.buttons.font;
        btn.style.width = `${dimentions[0]}`;
        btn.style.height = `${dimentions[1]}`;
        btn.style.position = "relative";
        btn.style.left = `${position[0]}`;
        btn.style.top = `${position[1]}`;
        btn.style.backgroundColor = this._theme.buttons.backgroundColor;
        btn.style.color = this._theme.buttons.textColor;
        btn.style.border = `${this._theme.buttons.borderThickness} ${this._theme.buttons.borderType} ${this._theme.buttons.borderColor}`;
        btn.style.borderRadius = this._theme.buttons.borderRadius
        btn.innerText = text;

        this._elements.push(btn)

        this._mainWindow.appendChild(btn);

        return btn
    }

    create_slider(text, min, max, position) {
        const slider = document.createElement("input")
        slider.style.position = "relative"
        slider.type = "range"
        slider.min = min
        slider.max = max
        slider.style.color = this._theme.gui.textColor
        slider.style.fontFamily = this._theme.gui.font
        slider.style.left = `${position[0]}`;
        slider.style.top = `${position[1]}`;

        const val = document.createElement("span")
        val.style.position = "relative"
        val.style.color = this._theme.gui.textColor
        val.style.fontFamily = this._theme.gui.font
        val.innerText = slider.value
        val.style.left = `${position[0] - 120}`;
        val.style.top = `${position[1]}`;
        
        slider.addEventListener("change", () => {
            val.innerText = slider.value
        })

        this._elements.push(slider)
        this._elements.push(val)
        this._mainWindow.appendChild(val)
        this._mainWindow.appendChild(slider)

        return slider
    }

    create_label(text, position) {
        const lab = document.createElement("span")
        lab.style.position = "relative"
        lab.innerText = text
        lab.style.color = this._theme.gui.textColor
        lab.style.fontFamily = this._theme.gui.font
        lab.style.left = `${position[0]}`;
        lab.style.top = `${position[1]}`;

        this._elements.push(lab)

        this._mainWindow.appendChild(lab)

        return lab
    }

    create_input(placeholder, dimentions, position) {
        const inp = document.createElement("input")
        inp.placeholder = placeholder
        inp.style.position = "relative"
        inp.style.left = `${position[0]}`
        inp.style.top = `${position[1]}`
        inp.style.width = `${dimentions[0]}`
        inp.style.height = `${dimentions[1]}`
        inp.style.border = `${this._theme.input.borderThickness} ${this._theme.input.borderType} ${this._theme.input.borderColor}`;
        inp.style.backgroundColor = this._theme.gui.backgroundColor
        inp.style.color = this._theme.gui.textColor
        this._mainWindow.appendChild(inp)

        this._elements.push(inp)

        return inp
    }

    create_checkbox(text, position, boxdim) {
        const checkbox = document.createElement("div")
        const label = document.createElement("span")
        checkbox.style.width = boxdim
        checkbox.style.height = boxdim
        checkbox.style.position = "relative"
        checkbox.style.border = `${this._theme.gui.borderThickness} ${this._theme.checkbox.borderType} ${this._theme.checkbox.borderColor}`;

        checkbox.style.left = position[0]
        checkbox.style.top = position[1]

        checkbox.classList.add("cb")

        label.style.fontFamily = this._theme.gui.font
        label.style.position = "relative"
        label.style.left = `calc(${position[0]} + 30px)`
        label.style.top = `calc(${position[1]} - 20px)`
        label.style.color = this._theme.gui.textColor
        label.innerText = text

        let toggled = false

        this._elements.push(checkbox)
        this._elements.push(label)

        this._mainWindow.appendChild(checkbox)
        this._mainWindow.appendChild(label)

        return checkbox
    }

    create_dropdown(label, options, dimentions, position) {
        const sel = document.createElement("select")
        sel.style.position = "relative"
        sel.style.backgroundColor = this._theme.dropdown.backgroundColor
        sel.style.border = `${this._theme.dropdown.borderThickness} ${this._theme.dropdown.borderType} ${this._theme.dropdown.borderColor}`;
        sel.style.color = this._theme.dropdown.textColor
        sel.style.borderRadius = this._theme.dropdown.borderRadius
        sel.style.left = position[0]
        sel.style.top = position[1]
        sel.style.width = dimentions[0]
        sel.style.height = dimentions[1]
        options.forEach(opts => {
            const opt = document.createElement("option")
            opt.value = opts
            opt.innerText = opts
            sel.appendChild(opt)
        })

        this._elements.push(sel)

        this._mainWindow.appendChild(sel)

        return sel
    }

    append_window() {
        document.body.appendChild(this._mainWindow);
        dragElement(this._mainWindow);
    }

    delete_element(elem) {
        elem.remove()
    }

    destroy_window() {
        this._mainWindow.remove();
    }
}

class UiLibDebug {
    error(message) {
        console.log("%c[4lpnUiLib]", `color: ${new UiLibTheme().get_theme()["debug"]["errorColor"]}`, message)
    }

    success(message) {
        console.log("%c[4lpnUiLib]", `color: ${new UiLibTheme().get_theme()["debug"]["successColor"]}`, message)
    }

    info(message) {
        console.log("%c[4lpnUiLib]", `color: ${new UiLibTheme().get_theme()["debug"]["infoColor"]}`, message)
    }
}
