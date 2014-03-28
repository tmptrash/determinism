/**
 * TODO:
 *
 * @author DeadbraiN
 */
N13.define('App.view.World', {
    extend  : 'App.Class',
    requires: ['App.element.Hydrogen'],
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
     */
    onInit: function () {
        this.callParent();

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

        //
        // TODO: clearing of the context is a temporary action
        //
        //this._context.fillRect(0, 0, this._canvasEl.width(), this._canvasEl.height());

        for (i = 0; i < len; i++) {
            this._elements[i].move().draw();
        }
    }
});