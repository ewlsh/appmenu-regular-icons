const UI = imports.ui;

var ICON_MODE = {
  SYMBOLIC : {value: 0, name: "Symbolic", css: "symbolic"}, 
  REGULAR: {value: 1, name: "Regular", css: "regular"}, 
  REQUEST : {value: 2, name: "Request", css: "request"}
};

const DEFAULT_ICON_MODE = ICON_MODE.SYMBOLIC;

function init() {}

function enable(){
  set_icon_mode(ICON_MODE.REGULAR);
}

function disable(){
  // Set it back to the Gnome Shell default
  set_icon_mode(DEFAULT_ICON_MODE);
}

function set_icon_mode(mode){
  if (typeof UI.main.panel.statusArea.appMenu._iconBox != 'undefined') {
        let icon = UI.main.panel.statusArea.appMenu._iconBox;
        icon.set_style("-st-icon-style: " + mode.css + ";");
  }
}


