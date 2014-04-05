/**
 * User interface related utilities
 *
 * Dependencies:
 *     N13
 *
 * @author DeadbraiN
 */
N13.define('App.help.Ui', {
    statics: {
        /**
         * {Array} Array of hex digits
         */
        _HEX_DIGITS: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],

        /**
         * Converts RGB string to the HEX string
         * @param {String} rgb RGB color in format: "rgb(xxx, xxx, xxx)"
         * @returns {String} HEX string in format '#XXXXXX"
         */
        rgb2hex: function (rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return "#" + this._hex(rgb[1]) + this._hex(rgb[2]) + this._hex(rgb[3]);
        },

        /**
         * Converts number into the HEX string
         * @param {Number} x
         * @returns {String} HEX string in format XX
         */
        _hex: function (x) {
            return isNaN(x) ? "00" : this._HEX_DIGITS[(x - x % 16) / 16] + this._HEX_DIGITS[x % 16];
        }
    }
});