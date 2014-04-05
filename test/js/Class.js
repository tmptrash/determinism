//noinspection JSHint
TestCase("App.Class", {
    testClassCreation: function () {
        assertNoException('App.Class should be created without exceptions.', function () {
            //noinspection JSHint
            new App.Class();
        });
    },

    /*
     * Checks whatever Interface mixin works correctly in the most basic class.
     * By works we mean calling of all interface methods.
     */
    testInterfaceMethods: function () {
        var i   = 0;
        var inc = function () {
            i++;
        };

        N13.define('App.temp.Class', {
            extend: 'App.Class',

            beforeInit  : inc,
            initPrivates: inc,
            initPublics : inc,
            onInit      : inc,
            afterInit   : inc
        });
        //noinspection JSHint
        new App.temp.Class();

        assertTrue('All public methods should be called', i === 5);
    }
});

