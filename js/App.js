/**
 * Application class. Creates main view and other root objects. Use run()
 * method as entry point of the application.
 *
 * @author DeadbraiN
 */
N13.define('App.App', {
    extend  : 'App.Class',
    requires: 'App.view.ViewPort',

    /**
     * Creator and initializer of all private fields. If you don't use or do not need
     * to initialize some fields, you should write them here and set to null.
     */
    initPrivates: function () {
        this.callParent(arguments);

        /**
         * {String} Main view of the application. It covers all browser client area
         */
        this._viewPort = new App.view.ViewPort();
    },

    /**
     * @constructor
     */
    init: function () {
        this.callParent();
        $(document).ready(this.run.bind(this));
    },

    /**
     * Entry point of the application. It will be run after html is ready.
     */
    run: function () {
        // TODO:
    }
});