/**
 * String utilities
 *
 * Dependencies:
 *     N13
 *
 * @author DeadbraiN
 */
N13.define('App.help.Common', {
    statics: {
        /**
         * Returns name of the caller of parent method. e.g:
         *     function F() {
         *         console.log(App.help.Common.getCallerName()); // shows 'F'
         *     }
         *
         * @returns {String}
         */
        getCallerName: function () {
            return arguments.callee.caller.name;
        }
    }
});