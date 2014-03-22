/**
 * String utilities
 *
 * Dependencies:
 *     N13
 *
 * @author DeadbraiN
 */
N13.define('App.help.String', {
    statics: {
        /**
         * Make capitalized string. Example: 'test' -> 'Test'
         * @param {String} s
         * @returns {String}
         */
        capitalize: function (s) {
            return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
        },

        /**
         * Replaces each format item in a specified string with the text equivalent of a corresponding argument's value.
         * format('Hello {0} my {1} friend', 'Olena', 'dear') -> 'Hello Olena my dear friend'
         * @param {String} string containing the format items (e.g. "{0}"), always has to be the first argument.
         * @returns {String}
         */
        format: function (str) {
            var i;

            // start with the second argument (i = 1)
            for (i = 1; i < arguments.length; i++) {
                // "gm" = RegEx options for Global search (more than one instance)
                // and for Multiline search
                var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                str = str.replace(regEx, arguments[i]);
            }

            return str;
        }
    }
});