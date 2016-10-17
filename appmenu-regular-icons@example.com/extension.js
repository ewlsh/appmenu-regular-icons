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

    this.settings.connect('changed::icon-mode', Lang.bind(this, function () {
        clear_icon_mode();
        update_icon_mode();
    }));

    update_icon_mode();
}

function disable() {
    this.settings = null;

    clear_icon_mode();
}

function update_icon_mode() {
    let iconMode = this.settings.get_string('icon-mode');

    for (let mode of Object.keys(IconMode)) {
        if (IconMode[mode].name === iconMode) {
            iconMode = IconMode[mode];
        }
    }

    let iconBox = Main.panel.statusArea.appMenu._iconBox;

    /* Make sure _iconBox exists... */
    if (typeof iconBox !== 'undefined' && iconBox !== null) {
        /* Style it. */
        iconBox.add_style_class_name(iconMode.css);
    }
}

function clear_icon_mode() {
    /* Set it back to the Gnome Shell default. */
    let iconBox = Main.panel.statusArea.appMenu._iconBox;

    /* Make sure _iconBox exists... */
    if (typeof iconBox !== 'undefined' && iconBox !== null) {
        /* Remove any styles. */
        for (let mode of Object.keys(IconMode)) {
            if (iconBox.has_style_class_name(IconMode[mode].css)) {
                iconBox.remove_style_class_name(IconMode[mode].css);
            }
        }
    }
}