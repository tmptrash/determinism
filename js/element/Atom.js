/**
 * The most elementary particle of the system - Atom. Contains only interface methods.
 *
 * @author DeadbraiN
 */
N13.define('App.element.Atom', {
    configs: {
        /**
         * @required
         * {Object} The context of the canvas 2d
         */
        context: null,
        /**
         * @required
         * {Number} X coordinate of the atom
         */
        x      : null,
        /**
         * @required
         * {Number} Y coordinate of the atom
         */
        y      : null,
        /**
         * {Number} Weight of the atom
         */
        weight : null,
        /**
         * {Number} Increment for X coordinate
         */
        incX   : 0.1,
        /**
         * {Number} Increment for Y coordinate
         */
        incY   : 0.1,
        /**
         * {String} Default point color - white
         */
        color  : '#FFFFFF'
    },


    /**
     * @interface
     * Makes a move one period of time
     * @return {App.element.Atom} itself
     */
    move: N13.emptyFn,


    /**
     * Draws itself on the canvas context
     * @return {App.element.Atom} itself
     */
    draw: function () {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, 1, 1);
        return this;
    }
});