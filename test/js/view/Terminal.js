/**
 * Unit test for Terminal class.
 */

//noinspection JSHint
TestCase("App.view.Terminal", {
    /*
     * This method will be called before every test
     */
    setUp: function () {
        //
        // We should override standard console.error(). Our custom method
        // should trows an error in case of call. This is how we may catch
        // this exception and signalize about it in tests.
        //
        this._oldErrorHandler = console.error;
        console.error         = function (msg) {
            throw new Error(msg);
        };

        //
        // textarea tag should be created for every test
        //
        $('body').append('<textarea id="testTerminal"></textarea>');
    },
    /*
     * This method will be called after every test
     */
    tearDown: function () {
        console.error = this._oldErrorHandler;
        $('body').children().remove();
    },


    testEmptyInstance: function () {
        //
        // Removes all nested tags in body
        //
        $('body').children().remove();

        assertException('Empty instance without configuration should be created with exception', function () {
            //noinspection JSHint
            new App.view.Terminal();
        });
    },
    testEmptyInstanceWithTextarea: function () {
        var term;
        assertException('Empty instance without configuration should be created without exception', function () {
            //noinspection JSHint
            term = new App.view.Terminal({beforeInit: function () {this.callParent(); term = this;}});
        });
    },


    testCorrectElementConfig: function () {
        var term;
        assertNoException('Terminal should be created correctly', function () {
            term = new App.view.Terminal({element: '#testTerminal'});
            assertTrue('Hello string should be created', $('#testTerminal').val() === term.user + '@' + term.host + ':~$ ');
        });
    }
});

