/*global App */

//noinspection JSHint
TestCase("App.view.base.View", {
    /**
     * This function calls every time before test starts and creates empty container for current view
     */
    setUp: function () {
        //
        // {jQuery} We should create temporary placeholder for views on current document
        //
        $('body').append('<div id="viewContainer"></div>');
        this.ct  = $('#viewContainer');
    },
    /**
     * This function calls after test will complete and removes containers children
     */
    tearDown: function () {
        $('body').children().remove();
    },


    //
    // This is configuration section. All tests below will test config parameters.
    //

    /*
     * Tests base view template related logic
     */
    testElementConfig: function () {
        var view = new App.view.base.View({element: '#viewContainer'});

        assertTrue('Empty view with correct element config should be created', view.className === 'App.view.base.View');

        assertTrue('View should has particular mixin', view.mixins.iface === 'App.mixin.Interface');
        assertTrue('View should has particular mixin', view.mixins.observe === 'App.mixin.Observer');
        assertTrue('View should has particular mixin', view.mixins.plugin === 'App.mixin.Plugin');

        assertTrue('View should has particular propertys', view._ID_SEPARATOR === '-');
    },

    testElementConfig: function () {
        var view = new App.view.base.View({element: '#viewContainer'});

        assertFunction("this should be a function", view.init);
    }
});

