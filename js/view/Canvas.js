/**
 * Implementation of canvas view. Now, it's 2D, but maybe it will be
 * changed to 3D type. Based on HTML canvas tag.
 *
 * @author DeadbraiN
 */
N13.define('App.view.Canvas', {
    extend  : 'App.Class',
    configs : {
        /**
         * {String} HTML unique identifier of <canvas> tag
         */
        id: 'canvas'
    },


    /**
     * All private fields creator and initializer
     */
    initPrivates: function () {
        /**
         * {CanvasRenderingContext2D} Rendering context
         */
        this._context = $('#' + this.id)[0].getContext('2d');
    },

    /**
     * Returns color of the specified point
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @return {String} Color in format '#RRGGBB'
     */
    getColor: function (x, y) {
        var imageData = this._context.getImageData(x, y, 1, 1).data;
        var dec2hexs  = this._dec2HexStr;

        return '#' + dec2hexs(+imageData[0]) + dec2hexs(+imageData[1]) + dec2hexs(+imageData[2]);
    },

    /**
     * Converts decimal number to hex string
     * @param number
     * @returns {string}
     * @private
     */
    _dec2HexStr: function (number) {
        if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }

        return number.toString(16).toUpperCase();
    }
});