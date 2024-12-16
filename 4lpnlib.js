function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") {
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
                "borderType": "solid",
                "borderThickness": "2px",
                "borderColor": "white"
            }
        };
    }

    get_theme() {
        return this._theme;
    }

    set title(string) {
        this._theme.gui.title = string;
    }

    set infoColor(newcol) {
        this._theme.debug.infoColor = newcol;
    }

    set errorColor(newcol) {
        this._theme.debug.errorColor = newcol;
    }

    set successColor(newcol) {
        this._theme.debug.successColor = newcol;
    }

    set mainTheme(newcol) {
        this._mainColor = newcol;
    }

    set backgroundColor(newcol) {
        this._theme.gui.backgroundColor = newcol;
    }
}

class UiLib {
    constructor() {
        this._mainWindow = null;
        this._theme = new UiLibTheme();
        this._tabs = null
        this._currentTab = null
        this._events = events
        this._guiBind = 16
        this._guiHidden = false
    }

    create_window(title, dimentions) {
        const th = this._theme;
        const winTitle = document.createElement("h4");
        winTitle.style.position = "relative"
        winTitle.style.color = th._theme.gui.textColor;
        winTitle.style.left = th._theme.gui.left;
        winTitle.style.top = th._theme.gui.top;
        winTitle.style.width = "fit-content"
        winTitle.style.border = `${th._theme.gui.borderThickness} ${th._theme.gui.borderType} ${th._theme.gui.borderColor}`
        winTitle.style.fontFamily = th._theme.gui.font;
        winTitle.innerText = title;

        this._mainWindow = document.createElement("div");
        this._mainWindow.style.zIndex = 999999;
        this._mainWindow.style.position = "absolute";
        this._mainWindow.style.width = `${dimentions[0]}`;
        this._mainWindow.style.height = `${dimentions[1]}`;
        this._mainWindow.style.border = `${th._theme.gui.borderThickness} ${th._theme.gui.borderType} ${th._theme.gui.borderColor}`;
        this._mainWindow.style.borderRadius = th._theme.gui.borderRadius
        this._mainWindow.style.backgroundColor = th._theme.gui.backgroundColor;


        document.body.addEventListener("keydown", (e) => {
            if (e.which == this._guiBind) {
                this._guiHidden = !this._guiHidden
                if (this._guiHidden) {
                    this._mainWindow.style.display = "none"
                } else {
                    this._mainWindow.style.display = "block"
                }
            }
        })

        this._events.addEventListener('newBg', (data) => {
            this._mainWindow.style.backgroundColor = data;
        });

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

        return cpicker
    }

    create_button(text, dimentions, position) {
        const th = this._theme;
        const btn = document.createElement("button");
        btn.style.fontFamily = th._theme.buttons.font;
        btn.style.width = `${dimentions[0]}`;
        btn.style.height = `${dimentions[1]}`;
        btn.style.position = "relative";
        btn.style.left = `${position[0]}`;
        btn.style.top = `${position[1]}`;
        btn.style.backgroundColor = th._theme.buttons.backgroundColor;
        btn.style.color = th._theme.buttons.textColor;
        btn.style.border = `${th._theme.buttons.borderThickness} ${th._theme.buttons.borderType} ${th._theme.buttons.borderColor}`;
        btn.style.borderRadius = th._theme.buttons.borderRadius
        btn.innerText = text;

        this._events.addEventListener("newBg", (data) => {
            btn.style.backgroundColor = data;
        });

        this._mainWindow.appendChild(btn);

        return btn
    }

    create_slider(text, min, max, position) {
        const slider = document.createElement("input")
        slider.style.position = "relative"
        slider.type = "range"
        slider.min = min
        slider.max = max
        slider.style.color = th.gui.textColor
        slider.style.fontFamily = th.gui.font
        slider.style.left = `${position[0]}`;
        slider.style.top = `${position[1]}`;

        const val = document.createElement("span")
        val.style.position = "relative"
        val.style.color = th.gui.textColor
        val.style.fontFamily = th.gui.font
        val.innerText = slider.value
        val.style.left = `${position[0] - 120}`;
        val.style.top = `${position[1]}`;
        
        slider.addEventListener("change", () => {
            val.innerText = slider.value
        })
        this._mainWindow.appendChild(val)
        this._mainWindow.appendChild(slider)

        return slider
    }

    create_label(text, position) {
        const lab = document.createElement("span")
        lab.style.position = "relative"
        lab.innerText = text
        lab.style.color = th.gui.textColor
        lab.style.fontFamily = th.gui.font
        lab.style.left = `${position[0]}`;
        lab.style.top = `${position[1]}`;

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
        inp.style.border = `${th.input.borderThickness} ${th.input.borderType} ${th.input.borderColor}`;
        inp.style.backgroundColor = th.gui.backgroundColor
        inp.style.color = th.gui.textColor
        this._mainWindow.appendChild(inp)

        this._events.addEventListener("newBg", (data) => {
            inp.style.backgroundColor = data;
        });

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

        ev.addEventListener("checked", (data) => {
            if (data === true) { 
                checkbox.style.backgroundColor = th.checkbox.toggledColor
            } else {
                checkbox.style.backgroundColor = th.gui.backgroundColor
            }
        })

        this._mainWindow.appendChild(checkbox)
        this._mainWindow.appendChild(label)

        return checkbox
    }

    create_dropdown(label, options, dimentions, position) {
        const sel = document.createElement("select")
        sel.style.position = "relative"
        sel.style.backgroundColor = th.dropdown.backgroundColor
        sel.style.border = `${th.dropdown.borderThickness} ${th.dropdown.borderType} ${th.dropdown.borderColor}`;
        sel.style.color = th.dropdown.textColor
        sel.style.borderRadius = th.dropdown.borderRadius
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

        this._events.addEventListener("newBg", (data) => {
            sel.style.backgroundColor = data;
        });


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
        console.log("%c[4lpnUiLib]", `color: ${th["debug"]["errorColor"]}`, message)
    }

    success(message) {
        console.log("%c[4lpnUiLib]", `color: ${th["debug"]["successColor"]}`, message)
    }

    info(message) {
        console.log("%c[4lpnUiLib]", `color: ${th["debug"]["infoColor"]}`, message)
    }
}
