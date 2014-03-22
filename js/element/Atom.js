/**
 * The most elementary particle of the system - Atom. Contains only interface methods.
 *
 * @author DeadbraiN
 */
N13.define('App.element.Atom', {
    configs: {
        /**
         * @required
         * {Number} X coordinate of the atom
         */
        x     : null,
        /**
         * @required
         * {Number} Y coordinate of the atom
         */
        y     : null,
        /**
         * {Number} Weight of the atom
         */
        weight: null
    },


    /**
     * @interface
     * Makes a move one period of time
     */
    move: N13.emptyFn
});