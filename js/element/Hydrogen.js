/**
 * Implementation of the Hydrogen atom.
 *
 * @author DeadbraiN
 */
N13.define('App.element.Hydrogen', {
    extend: 'App.element.Atom',

    /**
     * Calls one time per one iteration (frame). It should move the atom
     * base on coordinates increments.
     * @return {App.element.Hydrogen} Itself
     */
    move: function () {
        this.x += this.incX;
        this.y += this.incY;
        return this;
    }
});