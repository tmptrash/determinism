/**
 * The most basic class interface
 *
 * @author DeadbraiN
 */
N13.define('App.Class', {
    requires: [
        'App.Config',
        'App.help.String'
    ],

    /**
     * @interface
     * Calls first, before any initialization will be started.
     * Is used for pre initialization logic.
     */
    beforeInit: N13.emptyFn,

    /**
     * @interface
     * Creates and initializes all private fields in current class.
     */
    initPrivates: N13.emptyFn,

    /**
     * @interface
     * Creates and initializes all public fields in current class.
     */
    initPublics: N13.emptyFn,

    /**
     * @interface
     * Main initialization method. Is used for main init logic.
     */
    onInit: N13.emptyFn,

    /**
     * @interface
     * Calls after all initialization logic. Is used for
     * post initialization logic.
     */
    afterInit: N13.emptyFn,

    /**
     * @constructor
     * Calls all initialization methods
     */
    init: function () {
        this.beforeInit();
        this.initPrivates();
        this.initPublics();
        this.onInit();
        this.afterInit();
    },

    /**
     * Returns application wide unique identifier. Identifier is
     * differs between the same class instances. If this method
     * is called twice or more it will return same value;
     * @return {String} Unique instance identifier
     */
    getId: function () {
        /**
         * {String} Instance unique identifier
         */
        return this.id || (this.id = App.Config.ID_PREFIX + (new Date()).getTime());
    },

    /**
     * Checks if specified field contains correct value. In variable
     * or field is incorrect, then a console error will be generated.
     * @param {String} name Name of the field in current class
     * @param {Function} type Type of the name. e.g.: String, Boolean,...
     * @param {*} def Default value in case of invalid value
     */
    checkField: function (name, type, def) {
        if (!this[name] instanceof type) {
            console.error(App.help.String.format(
                'Invalid field "{0}::{1}". "{2}" type is required. Will be set to "{3}" value.',
                this.className,
                name,
                type.name,
                def
            ));
        }
    },

    /**
     * Checks if specified variable contains correct value. In variable
     * is incorrect, then a console error will be generated.
     * @param {String} val Value we need to check
     * @param {Function} type Type of the name. e.g.: String, Boolean,...
     * @param {*} def Default value in case of invalid value
     * @return {*} Current or default value
     */
    checkValue: function (val, type, def) {
        if (!val instanceof type) {
            console.error(App.help.String.format(
                'Invalid value "{0}" in class "{1}". "{2}" type is required. Will be set to "{3}" value.',
                val,
                this.className,
                type.name,
                def
            ));
            return def;
        }
        return val;
    }
});