/**
 * TODO:
 *
 * @author DeadbraiN
 */
N13.define('App.view.World', {
    extend  : 'App.Class',
    requires: [
        'App.help.String',
        'App.view.Canvas',
        'App.view.Terminal',
        'App.element.Hydrogen'
    ],
    configs : {
        /**
         * {Number} Amount of elements in the world
         */
        elAmount  : 10000,
        /**
         * {String} ID of the canvas tag
         */
        canvasId  : 'canvas',
        /**
         * {Number} Delay between frames
         */
        frameDelay: 1
    },

    /**
     * Creates and initializes all private fields of the class
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
        /**
         * {Array} Array of elements in the world
         */
        this._elements = [];
        /**
         * {jQuery} canvas tag jQuery element
         */
        this._canvasEl = $('#' + this.canvasId);
        /**
         * {CanvasRenderingContext2D} Canvas context
         */
        this._context  = this._canvasEl[0].getContext('2d');
        /**
         * {Number} Unique identifier of the interval (pooling) timer
         */
        this._timerId  = null;
    },

    /**
     * @constructor
     * Creates elements, binds handlers to events and initializes sizes of nested views
     */
    onInit: function () {
        this.callParent();
        this._createElements();
        this._bindEvents();
        this._onResize();
    },

    /**
     * Runs the world. Starts elements handling and moving.
     */
    run: function () {
        this._timerId = setInterval(this.onFrame.bind(this), this.frameDelay);
    },

    /**
     * One frame handler. One frame is an iteration in our world, where
     * states of all elements should be updated (moved). Depending of the element
     * the movement may be different.
     */
    onFrame: function () {
        var i;
        var len = this.elAmount;

        for (i = 0; i < len; i++) {
            this._elements[i].move().draw();
        }
    },

    /**
     * Browser window resize event handler. It resize all nested views and
     * stretch them on the browser screen.
     */
    _onResize: function () {
        var html     = $('html');
        var height   = html.height();
        var canvasEl = $('#' + this._canvas.id);

        //
        // TIP: It's important to set attributes instead of css style, because
        // TIP: canvas tag understands only this resize. In case of css style
        // TIP: changing, all draw objects in canvas will be scaled.
        //
        canvasEl.attr('height', (height - this._terminal.height));
        canvasEl.attr('width', html.width());
        $('#' + this._terminal.id).height(this._terminal.height);
    },

    /**
     * Creates all elements in the world and stores them in this._elements
     * @private
     */
    _createElements: function () {
        var i;
        var len     = this.elAmount;
        var thisEl  = this._canvasEl;
        var random  = App.help.Common.random;
        var context = this._context;
        var width   = thisEl.width();
        var height  = thisEl.height();

        for (i = 0; i < len; i++) {
            this._elements.push(new App.element.Hydrogen({
                x      : random(0, width),
                y      : random(0, height),
                context: context
            }));
        }
    },

    /**
     * Binds all handlers to events
     */
    _bindEvents: function () {
        $(window).on('resize', this._onResize.bind(this));
    }
});