function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.tagName === "INPUT") {
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
                "titleAlign": "center",  
                "title": "change me",
                "borderColor": "black",
                "borderType": "solid",
                "borderThickness": 1,
                "borderRadius": 0
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
        this._events = events
        this._guiBind = 16
        this._guiHidden = false
    }

    create_window(title, dimentions) {
        const th = this._theme;
        const winTitle = document.createElement("h4");
        winTitle.style.color = th._theme.gui.textColor;
        winTitle.style.textAlign = th._theme.gui.titleAlign;
        winTitle.style.fontFamily = th._theme.gui.font;
        winTitle.innerText = title;

        this._mainWindow = document.createElement("div");
        this._mainWindow.style.zIndex = 999999;
        this._mainWindow.style.position = "absolute";
        this._mainWindow.style.width = `${dimentions[0]}px`;
        this._mainWindow.style.height = `${dimentions[1]}px`;
        this._mainWindow.style.border = `${th._theme.gui.borderThickness} ${th._theme.gui.borderType} ${th._theme.gui.borderColor}`;
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

    create_button(text, dimentions, position, action) {
        const th = this._theme;
        const btn = document.createElement("button");
        btn.style.fontFamily = th._theme.gui.font;
        btn.style.width = `${dimentions[0]}px`;
        btn.style.height = `${dimentions[1]}px`;
        btn.style.position = "relative";
        btn.style.left = `${position[0]}px`;
        btn.style.top = `${position[1]}px`;
        btn.style.backgroundColor = th._theme.gui.backgroundColor;
        btn.style.color = th._theme.gui.textColor;
        btn.style.border = `${th._theme.gui.borderThickness} ${th._theme.gui.borderType} ${th._theme.gui.borderColor}`;
        btn.innerText = text;

        this._events.addEventListener("newBg", (data) => {
            btn.style.backgroundColor = data;
        });

        btn.addEventListener("click", () => {
            action();
        });

        this._mainWindow.appendChild(btn);

        return btn
    }

    create_slider(text, min, max, position, action) {
        const slider = document.createElement("input")
        slider.style.position = "relative"
        slider.type = "range"
        slider.min = min
        slider.max = max
        slider.style.color = th.gui.textColor
        slider.style.fontFamily = th.gui.font
        slider.style.left = `${position[0]}px`;
        slider.style.top = `${position[1]}px`;

        const val = document.createElement("span")
        val.style.position = "relative"
        val.style.color = th.gui.textColor
        val.style.fontFamily = th.gui.font
        val.innerText = slider.value
        val.style.left = `${position[0] - 120}px`;
        val.style.top = `${position[1]}px`;
        
        slider.addEventListener("change", () => {
            val.innerText = slider.value
            action(slider.value)
        })
        this._mainWindow.appendChild(val)
        this._mainWindow.appendChild(slider)

        return [val, slider]
    }

    create_label(text, position) {
        const lab = document.createElement("span")
        lab.style.position = "relative"
        lab.innerText = text
        lab.style.color = th.gui.textColor
        lab.style.fontFamily = th.gui.font
        lab.style.left = `${position[0]}px`;
        lab.style.top = `${position[1]}px`;

        this._mainWindow.appendChild(lab)

        return lab
    }

    create_input(placeholder, dimentions, position, action) {
        const inp = document.createElement("input")
        inp.placeholder = placeholder
        inp.style.position = "relative"
        inp.style.left = `${position[0]}px`
        inp.style.top = `${position[1]}px`
        inp.style.width = `${dimentions[0]}px`
        inp.style.height = `${dimentions[1]}px`
        inp.style.border = `${th.gui.borderThickness} ${th.gui.borderType} ${th.gui.borderColor}`;
        inp.style.backgroundColor = th.gui.backgroundColor
        inp.style.color = th.gui.textColor

        inp.addEventListener("change", () => {
            action(inp.value);
        })
        this._mainWindow.appendChild(inp)

        return inp
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
