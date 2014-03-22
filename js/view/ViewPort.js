/**
 * Main view of the application. Just a container for other views.
 *
 * @author DeadbraiN
 */
N13.define('App.view.ViewPort', {
    extend  : 'App.Class',
    requires: [
        'App.help.String',
        'App.view.Canvas',
        'App.view.Terminal'
    ],
    configs : {
        /**
         * {String} HTML identifier of the ViewPort view
         */
        id: 'viewport'
    },

    /**
     * Creator and initializer of all private fields
     */
    initPrivates: function () {
        /**
         * {App.view.Canvas} instance of canvas view
         */
        this._canvas   = new App.view.Canvas();
        /**
         * {App.view.Terminal} instance of terminal view
         */
        this._terminal = new App.view.Terminal();
    },

    /**
     * Main initialization method. Is used for binding events.
     */
    onInit: function () {
        this.callParent(arguments);

        $(window).on('resize', this.onResize.bind(this));

        this.onResize();
    },

    /**
     * Browser window resize event handler. It resize all nested views and
     * stretch them on the browser screen.
     */
    onResize: function () {
        var height = $('html').css('height');

        $('#' + this._canvas.id).height(height - this._terminal.height);
        $('#' + this._terminal.id).height(this._terminal.height);
    }
});