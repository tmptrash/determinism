/**
 * Application class. Creates main view and other root objects. Use run()
 * method as entry point of the application.
 *
 * @author DeadbraiN
 */
N13.define('App.App', {
    extend  : 'App.Class',
    requires: 'App.view.World',

    /**
     * Creator and initializer of all private fields. If you don't use or do not need
     * to initialize some fields, you should write them here and set to null.
     */
    initPrivates: function () {
        this.callParent(arguments);

        /**
         * {App.view.World} The world, where all elements leave
         */
        this._world = new App.view.World();
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
        this._world.run();
    }
});