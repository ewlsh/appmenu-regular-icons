/* exported init, buildPrefsWidget */

const Lang = imports.lang;

const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() { }

function buildPrefsWidget() {
    this._settings = Convenience.getSettings();

    let widget = new Gtk.Grid();
    widget.add(new Gtk.Label({ label: 'Icon Mode' }));

    let box = new Gtk.ComboBoxText();
    box.append('Symbolic', 'Symbolic');
    box.append('Regular', 'Regular');
    box.append('Request', 'Request');

    box.set_margin_left(5);

    let mode = this._settings.get_string('icon-mode');
    box.set_active_id(mode);

    box.connect('changed', Lang.bind(this, function () {
        let mode = box.get_active_id();
        this._settings.set_string('icon-mode', mode);
    }));

    widget.add(box);

    widget.set_margin_left(20);
    widget.set_margin_top(20);

    widget.show_all();

    return widget;
}