/* exported init, enable, disable */

const Lang = imports.lang;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const Main = imports.ui.main;

let IconMode = {
    SYMBOLIC: { value: 0, name: 'Symbolic', css: 'icon-mode-symbolic' },
    REGULAR: { value: 1, name: 'Regular', css: 'icon-mode-regular' },
    /* Not used for now... but maybe in the future. */
    REQUEST: { value: 2, name: 'Request', css: 'icon-mode-request' }
};
Object.freeze(IconMode);


function init() { /* We don't need to init anything */ }

function enable() {
    this.settings = Convenience.getSettings();

    this._changedSig = this.settings.connect('changed::icon-mode', Lang.bind(this, function () {
        clear_icon_mode();
        update_icon_mode();
    }));

    update_icon_mode();
}

function disable() {
    this.settings.disconnect(this._changedSig);
    this.settings = null;

    clear_icon_mode();
}

function update_icon_mode() {
    let icon_mode_name = this.settings.get_string('icon-mode');
    let icon_mode = null;

    for (let mode of Object.keys(IconMode)) {
        if (IconMode[mode].name === icon_mode_name) {
            icon_mode = IconMode[mode];
        }
    }

    let icon_box = Main.panel.statusArea.appMenu._iconBox;

    /* Make sure _iconBox exists... */
    if (typeof icon_box !== 'undefined' && icon_box !== null && icon_mode !== null) {
        /* Style it. */
        icon_box.add_style_class_name(icon_mode.css);
    }
}

function clear_icon_mode() {
    /* Set it back to the Gnome Shell default. */
    let icon_box = Main.panel.statusArea.appMenu._iconBox;

    /* Make sure _iconBox exists... */
    if (typeof icon_box !== 'undefined' && icon_box !== null) {
        /* Remove any styles. */
        for (let mode of Object.keys(IconMode)) {
            let css = IconMode[mode].css;

            if (icon_box.has_style_class_name(css)) {
                icon_box.remove_style_class_name(css);
            }
        }
    }
}